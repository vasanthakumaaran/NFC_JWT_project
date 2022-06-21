var Cryptr = require('cryptr');
var cryptr = new Cryptr('ACET');

var encstring = cryptr.encrypt("hello world");
var decstring = cryptr.decrypt(encstring);

console.log(encstring);
console.log(decstring);