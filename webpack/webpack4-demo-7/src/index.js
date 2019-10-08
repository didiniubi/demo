// import '@babel/polyfill';
// 部分es6新特性低版本浏览器是不兼容的 所以需要在代码执行前引入@babel/polyfill 来对低版本进行补充 
let name = 'ddd';
console.log(name);
let promiseList = [
    new Promise(),
    new Promise()
]

promiseList.map(item => {
    console.log(item);
})