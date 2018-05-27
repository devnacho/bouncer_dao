'use strict';

var myWeb3= require('../providers/myWeb3');



    // function checkAccess(address incomingPerson) public view returns (bool) {
    //     return accessAllowance[incomingPerson];
    // }


exports.checkAccess= function(addr){
  return new Promise( (resolve, reject) =>{
    myWeb3.myContractInstance.checkAccess(addr,{from: addr})
    .then((result) => {
      console.log(result);
      resolve('OK')

      // let ethStr=myWeb3.web3.fromWei(result['blue'],'ether');
      // let ethStr2=myWeb3.web3.fromWei(result['red'],'ether');
      // resolve([ethStr,ethStr2]);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    })
  });
}