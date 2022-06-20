export const serverName = 'https://d571-14-169-11-68.ap.ngrok.io';
export const api = serverName + '/public/api/';
// var hostName = 'https://localhost' + '/public/api';
// var hostImage = 'https://localhost' + '/public/upload/'
export const image_api = serverName + '/public/upload/'

export function toVND(value) {
  return value.toLocaleString('it-IT', {style : 'currency', currency : 'vnd'});
}

export function convertAPI(request_link) {
  return api + request_link;
}

export function convertImageAPI(request_link) {
  return image_api + request_link;
}