import { Injectable } from '@angular/core';
import { Cordova, Plugin, IonicNativePlugin } from '@ionic-native/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Plugin({
  pluginName: 'bouncer-hce',
  repo: 'https://github.com/don/cordova-plugin-hce',
  plugin: 'cordova-plugin-hce',
  pluginRef: 'hce',
  platforms: ['Android']
})
@Injectable()
export class HCE extends IonicNativePlugin {


  /**
   * Subscribe to be notified on init
   * @returns {Promise<any>} Returns a promise
   */
  @Cordova({
    platforms: ['Android'],
    // observable: true,
    // clearFunction: 'sleep'
  })
  private registerCommandCallback(): Promise<any> { return; }




  /**
  * Starts HCE
  * @returns {Promise<any>} returns a promise
  */
  start(): Promise<any> {
    return this.registerCommandCallback().then(() => {
     console.log('asdadsadad ERROR')
    });
  }

    // read: function(cardType, successCallback, failureCallback) {
    //     cordova.exec(successCallback,
    //         failureCallback,
    //         "acr35",
    //         "read",
    //         [cardType]);
    // },
  // lastActivity: Date = null;

  // /**
  //  * Subscribe to be notified on read.
  //  * @param {string} cardType card type to be read . Card types provided in the ACR35 SDK documentation: 
  //  * @returns {Observable<any>} Returns an observable
  //  */
  // @Cordova({
  //   platforms: ['Android'],
  //   observable: true,
  //   clearFunction: 'sleep'
  // })
  // private read(cardType: string): Observable<any> { return; }

  // /**
  // * Stops the polling thread and then sends the reader to sleep
  // * @returns {Promise<any>} returns a promise
  // */
  // @Cordova({
  //   platforms: ['Android']
  // })
  // private sleep(): Promise<any> { return; }


  // get sleeping(): boolean {
  //   if (this.lastActivity == null) {
  //     return true;
  //   }
  //   let now = new Date();
  //   let elapsed = now.getTime() - this.lastActivity.getTime();
  //   return (elapsed > 5000);
  // }

  // /**
  // * Subscribe to be notified on read.
  // * @param {string} cardType card type to be read . Card types provided in the ACR35 SDK documentation: 
  // * @param {number} duplicateThreshold milliseconds to wait to notify the same uid
  // * @returns {Observable<any>} Returns an observable
  // */
  // startDiscovery(cardType: string, duplicateThreshold = 3000, onStarted: any = null): Observable<any> {
  //   let started = false;

  //   let onInitialize = () => {
  //     if (!started) {
  //       started = true;
  //       if (onStarted) onStarted();
  //     }
  //   }

  //   return Observable.create(observer => {
  //     let lastUid = '';
  //     let lastTime = new Date();

  //     this.read(cardType).subscribe((message: string) => {

  //       if (message == 'disconnected') {
  //         return observer.error(new Error('could not connect to the reader. Is it charged?'));
  //       }

  //       if (message == 'unplugged') {
  //         return observer.error(new Error('no device is plugged into the audio socket'));
  //       }

  //       if (message == 'low_volume') {
  //         return observer.error(new Error('your device media volume is not set to 100%'));
  //       }

  //       if (message == "initialised") {
  //         onInitialize();
  //         return;
  //       }

  //       onInitialize();
  //       this.lastActivity = new Date();

  //       if (message.startsWith("90 00")) {
  //         return;
  //       }
  //       if (message.startsWith("63 00")) {
  //         return;
  //       }

  //       for (let errorCode of ["63 00", "62 82", "6A 81", "6C 01", "6C 02", "6C 03", "6C 04", "6C 05", "6C 06"]) {
  //         if (message.endsWith(errorCode)) {
  //           return;
  //         }
  //       }
        
  //       let uid = message.substring(0, message.lastIndexOf("90 00"));

  //       let now = new Date();
  //       let elapsed = now.getTime() - lastTime.getTime();

  //       if (lastUid == uid && elapsed < duplicateThreshold) {
  //         return;
  //       }

  //       lastUid = uid;
  //       lastTime = new Date();

  //       observer.next(uid.replace(/ /g, ''));

  //     }, error => observer.error(error), () => observer.complete())
  //   });

  // }

  // /**
  // * Stops the polling thread and then sends the reader to sleep
  // * @returns {Promise<any>} returns a promise
  // */
  // stopDiscovery(): Promise<any> {
  //   return this.sleep().then(() => {
  //     this.lastActivity = null;
  //   });
  // }
}