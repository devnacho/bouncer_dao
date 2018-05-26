import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NFC, Ndef } from '@ionic-native/nfc';
import EthCrypto from 'eth-crypto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	nfcEnabled: boolean= false;
	nfcStarted: boolean = false;

  constructor(public navCtrl: NavController, private nfc: NFC, private ndef: Ndef) {
  	this.init();

  }

  init(){
  	this.checkNFCEnabled();

  }

  checkNFCEnabled(){
  	let that=this;
  	this.nfc.enabled()
  	.then((data)=>alert(data))
  	.catch((err)=>{
		alert("error"+err);

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

    // alert('starting NFC');
    // this.nfc.addTagDiscoveredListener(() => {
   	let that=this;
    this.nfc.addNdefListener(() => {
    	that.nfcStarted=true;
        alert('NFC Started!');
      	console.log('successfully attached ndef listener');
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event) => {

      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));

      let payload = event.tag.ndefMessage[0]["payload"];
      let stringPayload = this.nfc.bytesToString(payload);

      alert(stringPayload);
    });

  }


   testSign() {
    const message = 'foobar';
    const messageHash = EthCrypto.hash.keccak256(message);
    const signature = EthCrypto.sign(
      '41a06e2beff68d6c99da87b5127b72fb452fc226ce5cb3236382555293ec037a', // privateKey
      messageHash // hash of message
    );
    console.log(signature)
    alert(signature);

  }


}
