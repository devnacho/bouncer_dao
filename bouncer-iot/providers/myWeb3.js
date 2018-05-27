var Web3 = require('web3');
var Eth = require('ethjs')
var ABI = require('../lib/abi');

var MyWeb3 = {
	web3: null,
	eth: null,
	myContractInstance: null,
	contractABI:ABI,
	contractAddr: null,

  	init:  function(ADDR,NODE_ADDR) {
  		this.contractAddr=ADDR;
 		this.web3 = new Web3(new Web3.providers.HttpProvider(NODE_ADDR));
 		this.eth = new Eth(this.web3.currentProvider);
 		let MyContract = this.eth.contract(this.contractABI);
 		this.myContractInstance = MyContract.at(this.contractAddr);
 	}
};

module.exports = MyWeb3;