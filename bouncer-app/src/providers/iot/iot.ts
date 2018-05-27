import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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


    // let data={
    //   'address':this.identity.address,
    //   'message':'18:00:11',
    //   'signature':null
    // };

    console.log(deviceIP);


  return new Promise((resolve, reject) => {
    this.http.post('http://'+deviceIP, JSON.stringify(accessData))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });



  // return new Promise(resolve => {
  //   this.http.get('http://'+deviceIP).subscribe(data => {
  //     resolve(data);
  //   }, err => {
  //     console.log(err);
  //   });
  // });
  }







// addUser(data) {
//   return new Promise((resolve, reject) => {
//     this.http.post(this.apiUrl+'/users', JSON.stringify(data))
//       .subscribe(res => {
//         resolve(res);
//       }, (err) => {
//         reject(err);
//       });
//   });
// }

}
