import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NfcProvider } from '../../providers/nfc/nfc';

import { NFC, Ndef } from '@ionic-native/nfc';
import EthCrypto from 'eth-crypto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	nfcEnabled: boolean= false;
	nfcStarted: boolean = false;
  identity: any;
  constructor(public navCtrl: NavController, private nfcp: NfcProvider) {
  	this.init();

  }

  init(){
  	this.checkNFCEnabled();
    // this.createWallet();
    // this.testSign();

  }


  createWallet(){
     this.identity = EthCrypto.createIdentity();

  }

  checkNFCEnabled(){
    let that=this;
    this.nfcp.checkNFCEnabled()
    .then((data)=>this.nfcEnabled=true)
  	.catch((err)=>{
		// alert("error"+err);
		if(err=='NFC_DISABLED'){
			alert("please enable NFC");
			that.nfc.showSettings();
		}
		else if(err=='cordova_not_available'){
			alert("NFC not available on your device");
		}
  	});
  }


  startNFC(){
  	if(!this.nfcEnabled)return this.checkNFCEnabled();
    this.nfcp.listen()
    .then((data)=>{
        alert(data);
    })
    .catch((err)=>{
      alert('err'+err);
    })



  }


   testSign() {
    const message = 'foobar';
    const messageHash = EthCrypto.hash.keccak256(message);
    const signature = EthCrypto.sign(this.identity.privateKey, // privateKey
      messageHash // hash of message
    );

    console.log(signature)

    let ej={};
    ej['signature']=signature;
    ej['address']=this.identity.address;
    ej['message']=message;

    console.log(ej);

  }


}
