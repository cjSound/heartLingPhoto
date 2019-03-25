var DEV_URL='';
var PRODUCT_URL='';

var URL =process.env.NODE_ENV=='production'?PRODUCT_URL:DEV_URL;

export  {URL};