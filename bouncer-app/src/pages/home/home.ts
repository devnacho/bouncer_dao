import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { NfcProvider } from '../../providers/nfc/nfc';

import { IotProvider } from '../../providers/iot/iot';

// import { NFC, Ndef } from '@ionic-native/nfc';
import EthCrypto from 'eth-crypto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	nfcEnabled: boolean= false;
  nfcStarted:boolean=false;

  accessResult:any;
  accessError:any;

 // 172.16.9.157

  identity: any;
  loading: Loading;
  isLoading:boolean=false;

  constructor(public navCtrl: NavController, private nfc: NfcProvider, private iot: IotProvider, private loadingCtrl:LoadingController) {
  	this.init();

  }

  showLoading(){
    if(!this.isLoading){
             this.loading = this.loadingCtrl.create({
      content: 'Checking Access...'
  });
      this.loading.present();
      this.isLoading=true;
      this.accessResult=false;
      this.accessError=false;
    }
  }

  dismissLoading(){
    this.loading.dismiss();
    this.isLoading=false;
  }

  init(){


  	this.checkNFCEnabled();
    this.createWallet();
    // this.testSign();

  }


//   presentLoadingCustom() {
//   let loading = this.loadingCtrl.create({
//     spinner: 'hide',
//     content: `
//       <div class="custom-spinner-container">
//         <div class="custom-spinner-box"></div>
//       </div>`,
//     duration: 5000
//   });

//   loading.onDidDismiss(() => {
//     console.log('Dismissed loading');
//   });

//   loading.present();
// }




  createWallet(){
    this.identity = EthCrypto.createIdentity();
  }

  checkNFCEnabled(){
    let that=this;
    this.nfc.checkNFCEnabled()
    .then((data)=>{
      this.nfcEnabled=true;
      this.startNFC();
    })
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
    let that=this;
  	if(!this.nfcEnabled)return this.checkNFCEnabled();
    this.nfc.listen()
    .subscribe((data)=>{
      data=""+data;
      console.log(data);
      // alert(data);
      that.requestAccess(data);
    })
  }

  requestAccess(deviceIP){
    this.showLoading();
    let that=this;

    var milliseconds = (new Date).getTime();
    let msg=""+milliseconds;

    // alert(msg);

    let data={
      'address':this.identity.address,
      'message': msg,
      'signature':null
    };



    const messageHash = EthCrypto.hash.keccak256(data.message);
    data.signature=this.signMsg(messageHash);
    // data['deviceIP']=deviceIP;
    // data['signature']=signature;
    // data['address']=this.identity.address;
    // data['message']=message;
    // alert('making request to'+deviceIP);
    this.iot.requestAccess(deviceIP,data)
    .then((data)=> {
        // this.loading.dismiss();
        that.dismissLoading();
        that.accessResult=true;
        // alert('access OK:'+data);
    })
    .catch((err)=>{
        that.dismissLoading();
        that.accessError=true;
        alert('err:'+err);
    })
  }


  signMsg(msg){
    return EthCrypto.sign(this.identity.privateKey, // privateKey
      msg // hash of message
      );
  }

  testSign() {
    this.requestAccess('172.16.8.176:8000');
  }


}
