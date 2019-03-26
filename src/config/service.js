var DEV_URL='http://localhost:8099/';
var PRODUCT_URL='https://www.cjsound.top/';

var URL =process.env.NODE_ENV=='production'?PRODUCT_URL:DEV_URL;

export  {URL};