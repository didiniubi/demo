// Es module es6语法
import sum from './sum.js';
// commonJs
var minus = require('./minus.js');
// AMD
var muit = require('./mult');

require(['./mult'], function(mult) {
    console.log('amd模范引用', mult(12 * 22));
})

console.log(sum(12, 22));
console.log(minus(12, 22), 'minus');
console.log('12*22 =', muit(12, 22));