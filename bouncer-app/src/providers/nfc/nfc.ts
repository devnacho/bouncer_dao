import { Injectable } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc';

import { Observable } from 'rxjs/Observable';

/*
  Generated class for the NfcProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class NfcProvider {


  	public hasStarted:boolean=false;
  	constructor(private nfc: NFC, private ndef: Ndef) {
  		console.log('Hello NfcProvider Provider');
  	}

  	checkNFCEnabled(): Promise<any>{
  		return this.nfc.enabled();
  	}

  	showSettings(): Promise<any>{
  		return 	this.nfc.showSettings();
  	}


  	// start(): Observable<any>{
  	// 	  	let that=this;
  	// 	  	return that.nfc.addNdefListener();
  	// }

  	listen(): Observable<any>{
      let that=this;
      return Observable.create(observer => {
        that.nfc.addNdefListener(() => {
          that.hasStarted=true;
          console.log('successfully attached ndef listener');
        }, (err) => {
          observer.error(err);
        }).subscribe((event) => {

          console.log('received ndef message. the tag contains: ', event.tag);
          console.log('decoded tag id', that.nfc.bytesToHexString(event.tag.id));

          let payload = event.tag.ndefMessage[0]["payload"];
          let stringPayload = that.nfc.bytesToString(payload);

          observer.next(stringPayload);
        });
      });


    }
  }



