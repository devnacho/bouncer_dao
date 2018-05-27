import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,LoadingController } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';


import { NFC, Ndef } from '@ionic-native/nfc';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HCE} from '../providers/hce/hce';
import { NfcProvider } from '../providers/nfc/nfc';
import { IotProvider } from '../providers/iot/iot';


// import * as HCE from '../../plugins/cordova-plugin-hce';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoadingController,
    HCE,
    NFC,
    Ndef,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NfcProvider,
    IotProvider,

  ]
})
export class AppModule {}
