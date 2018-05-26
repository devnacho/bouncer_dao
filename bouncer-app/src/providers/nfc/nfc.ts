import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc';
/*
  Generated class for the NfcProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class NfcProvider {

  	constructor(public http: HttpClient, private nfc: NFC, private ndef: Ndef) {
  		console.log('Hello NfcProvider Provider');
  	}

  	checkNFCEnabled(): Promise<any>{
  		return this.nfc.enabled();

  	}


  	listen(): Promise<any>{

  	    // alert('starting NFC');
    	// this.nfc.addTagDiscoveredListener(() => {
    	let that=this;
    	return new Promise(function(res,rej){
    		this.nfc.addNdefListener(() => {
		    	// that.nfcStarted=true;
		    	alert('NFC Started!');
		    	console.log('successfully attached ndef listener');
		    }, (err) => {
		    	rej(err);
		    }).subscribe((event) => {

		    	console.log('received ndef message. the tag contains: ', event.tag);
		    	console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));

		    	let payload = event.tag.ndefMessage[0]["payload"];
		    	let stringPayload = this.nfc.bytesToString(payload);

		    	res(stringPayload);
		    });
		});



    }


}
