let baseUrl = 'http://192.168.2.10:3015';
let printUrl = 'https://meditek.redimed.com.au:3013';


export function printUrl(url){
  return printUrl + url;
}

export function apiUrl(url){
  return baseUrl + url;
}
