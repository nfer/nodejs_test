'use strict';

var data = '123';
var buf1 = Buffer(data);
var buf2 = new Buffer(data);
console.log(buf1);
console.log(buf2);
console.log(buf1.compare(buf2));
