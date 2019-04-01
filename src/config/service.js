var DEV_URL='http://192.168.11.90:8099/photo-service/';
var DEV_FILE='http://192.168.11.90/photo-service/'

var PRODUCT_URL='https://www.cjsound.top/photo-service/';
var PRODUCT_FILE='https://www.cjsound.top/photo-service/';

var URL =process.env.NODE_ENV=='production'?PRODUCT_URL:DEV_URL;
var FILE_URL =process.env.NODE_ENV=='production'?PRODUCT_FILE:DEV_FILE;

export  {URL,FILE_URL};