const electron = require('electron')
const http = require('http')
const EthCrypto = require('eth-crypto');
const {ipcMain} = require('electron')
var config= require('./config');

const BrowserWindow = electron.BrowserWindow
const app = electron.app


var accessService = require('./providers/accessService');
var responseService = require('./providers/responseService');



var express = require('express');
var bodyParser = require("body-parser");


const ABI= [
{
  "anonymous": false,
  "inputs": [
  {
    "indexed": false,
    "name": "allower",
    "type": "address"
  },
  {
    "indexed": false,
    "name": "allowedAddress",
    "type": "address"
  }
  ],
  "name": "AccessAllowed",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
  {
    "indexed": false,
    "name": "revoker",
    "type": "address"
  },
  {
    "indexed": false,
    "name": "revokedAddress",
    "type": "address"
  }
  ],
  "name": "AccessRevoked",
  "type": "event"
},
{
  "constant": false,
  "inputs": [
  {
    "name": "incomingPerson",
    "type": "address"
  }
  ],
  "name": "giveAccess",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
  {
    "name": "incomingPerson",
    "type": "address"
  }
  ],
  "name": "revokeAccess",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
  {
    "name": "",
    "type": "address"
  }
  ],
  "name": "accessAllowance",
  "outputs": [
  {
    "name": "",
    "type": "bool"
  }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
  {
    "name": "",
    "type": "uint256"
  }
  ],
  "name": "allowedAddresses",
  "outputs": [
  {
    "name": "",
    "type": "address"
  }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
  {
    "name": "incomingPerson",
    "type": "address"
  }
  ],
  "name": "checkAccess",
  "outputs": [
  {
    "name": "",
    "type": "bool"
  }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "getAllAllowedAddresses",
  "outputs": [
  {
    "name": "",
    "type": "address[]"
  }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "totalAccesses",
  "outputs": [
  {
    "name": "",
    "type": "uint256"
  }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}
]


// web3.eth.blockNumber
var ethers = require('ethers');
var providers = ethers.providers;

// Connect to a local Parity instance
var provider = new providers.JsonRpcProvider('http://d4b08598.ngrok.io', 'testnet');
// var Eth = require('ethjs')
provider.getBlockNumber().then(function(blockNumber) {
  console.log("Current block number: " + blockNumber);
});




// var abi = require('./lib/abi');
var contract = new ethers.Contract('0x60FB9a848482b5cc09013474f01bcD2ca1D138A5', ABI, provider);
var callPromise = contract.checkAccess('0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb');

callPromise.then(function(result) {
  console.log('contract result:',result);
});

//     // this.web3 = new Web3.providers.HttpProvider('d4b08598.ngrok.io');
// var Web3 = require('web3');
// var web3 = new Web3(new Web3.providers.HttpProvider("http://d4b08598.ngrok.io:80"));


//     console.log(web3.currentProvider);
//     var Eth = require('ethjs')
//     var eth = new Eth(web3.currentProvider);

//     console.log('blockNumber from web3',eth.blockNumber());




var myWeb3= require('./providers/myWeb3');
myWeb3.init(config.CONTRACT_ADDR,config.NODE_ADDR);

var expressApp = express();
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());

let mainWindow;
let appStatus;

function initApp() {
  initHttpApp()
  createWindow()
}

function initHttpApp() {


  expressApp.post('/', function (req, res) {
    console.log('got request');
    // console.log(req);
    let signature = req.body.signature
    let address = req.body.address
    let message = req.body.message

    const signer = EthCrypto.recover(
      signature,
      EthCrypto.hash.keccak256(message)
      );

    if (signer == address) {
      console.log("Signature validated!",address)

      accessService.checkAccess(address)


      .then((data)=>{
        console.log('acess ok',data)
        if(data){

          responseService.respond( 'ok',res);
          appStatus = {
            allowed: true,
            msg: 'Allowed'
          }
        }

        else{
          responseService.error( null,res);
          appStatus = {
          allowed: false,
          msg: 'Not on blockchain'
        }
        }



      })
      .catch((err)=>{
         console.log('acess err',err)
          responseService.error( err,res);
          appStatus = {
          allowed: false,
          msg: 'Not on blockchain'
        }
      });
    } 


    else {
      // signature validation failed
      appStatus = {
        allowed: false,
        msg: 'Signature validation failed'
      }

      responseService.error( err,res);
    }




    // res.send('Ok');
  });



  expressApp.listen(8000, function () {
    console.log('Example app listening on port 8000!');
  });

  ipcMain.on('asynchronous-message', (event, arg) => {
    if (appStatus !== undefined) {
      console.log('responding message appStatus:',appStatus);
      event.sender.send('asynchronous-reply', appStatus)
      appStatus = undefined;
    }
  })
}


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  //mainWindow.setFullScreen(true);
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

app.on('ready', initApp)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
