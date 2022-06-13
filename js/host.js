
var serveName = 'https://1233-14-169-11-68.ap.ngrok.io';
var hostName = serveName + '/public/api';
// var hostName = 'https://localhost' + '/public/api';
// var hostImage = 'https://localhost' + '/public/upload/'
var hostImage = serveName + '/public/upload/'
function toVND(value) {
  return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}