var DEV_URL='http://192.168.31.251:8099/';
var DEV_FILE='http://192.168.31.251:8080/photo-service/'

var PRODUCT_URL='https://www.cjsound.top/';
var PRODUCT_FILE='https://www.cjsound.top/';

var URL =process.env.NODE_ENV=='production'?PRODUCT_URL:DEV_URL;
var FILE_URL =process.env.NODE_ENV=='production'?PRODUCT_FILE:DEV_FILE;

export  {URL,FILE_URL};