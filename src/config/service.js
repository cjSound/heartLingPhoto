var DEV_URL='http://localhost:8099/';
var DEV_FILE='http://localhost:8080/photo-service/'

var PRODUCT_URL='https://www.cjsound.top/';
var PRODUCT_FILE='https://www.cjsound.top/';

var URL =process.env.NODE_ENV=='production'?PRODUCT_URL:DEV_URL;
var FILE_URL =process.env.NODE_ENV=='production'?PRODUCT_FILE:DEV_FILE;

export  {URL,FILE_URL};