import _ from 'lodash';
console.log(_.join(['dd', 'nb', 'hhhe']));
let test = (() => {
    // 异步加载loadsh
    // 引入的库取一个chunk名字
    return import(/* webpackChunkName:lodash */'lodash').then((_) => {
        return console.log(_.join(['dd', 'nb'])) 
    })
});
test();
// document.addEventListener('click', () => {
//     console.log(1);
//     const ele = document.createElement('div');
//     ele.innerHTML = 'dd';
//     document.body.appendChild(ele);
// })
