import Content from './content';
var CommonJsTest = require('./commonJs-module');
var pic = require('./webpack.jpg');
new Content();
console.log(pic);
console.log(CommonJsTest(2, 3));
