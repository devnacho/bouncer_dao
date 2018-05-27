import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import {RequestOptions} from '@angular/http';

/*
  Generated class for the IotProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class IotProvider {

    constructor(public http: HttpClient) {
      console.log('Hello IotProvider Provider');
    }

    requestAccess(deviceIP,accessData): Promise<any>{

      console.log(deviceIP);

      return new Promise((resolve, reject) => {
        this.http.post('http://'+deviceIP, JSON.stringify(accessData), {
          headers: { 'Content-Type': 'application/json' }
        })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });


    }

  }
