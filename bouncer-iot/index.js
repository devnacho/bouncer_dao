


const {ipcRenderer} = require('electron')
let interval;

function ready(fn) {
 if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
   fn();
 } else {
   document.addEventListener('DOMContentLoaded', fn);
 }
}

function runInterval() {
 interval = setInterval(function(){
   ipcRenderer.send('asynchronous-message', 'ping');
 }, 1000);
}

ready(runInterval);


ipcRenderer.on('asynchronous-reply', (event, arg) => {
 console.log('Msg response received: ' + arg.allowed)
 // clearInterval(interval)
 let body = document.querySelectorAll('body')[0];

           // update UI
           if (arg.allowed) {
             let waitingMessage = document.querySelectorAll('#waiting-message')[0];
             waitingMessage.style.display = 'none';

             let inMessage = document.querySelectorAll('#in-message')[0];
             inMessage.style.display = 'block';

             addClass(body, 'in-bg');
           } 

           else {
             let waitingMessage = document.querySelectorAll('#waiting-message')[0];
             waitingMessage.style.display = 'none';

             let outMessage = document.querySelectorAll('#out-message')[0];
             outMessage.style.display = 'block';

             addClass(body, 'out-bg');
           }
         })

function addClass(el, className){
 if (el.classList){
   el.classList.add(className);
 } else {
   el.className += ' ' + className;
 }
}