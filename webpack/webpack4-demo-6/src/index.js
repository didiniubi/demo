console.log('hello World');
import './style/index.less';
import counter from './counter';
var dom = document.getElementsByClassName('root');
var btn = document.createElement('button');
btn.innerHTML = '点击';
document.body.appendChild(btn)
btn.onclick = function() {
    console.log(111)
    var div = document.createElement('div');
    div.innerHTML = 'item';
    document.body.appendChild(div)
}

dom[0].innerHTML = 'ddd';
counter();

if(module.hot)  { // 检查是否开启hmr模式
    module.hot.accept('./counter', function() { // module.hot.accept 检测发生变化
        document.body.removeChild(document.getElementById('counter'));
        counter();
    })
}
// 疑问 为什么less改变没有去做hmr监听，js做了这些？
// css-loader把hmr代码已经写过了 我们做react的时候 借助了babel-preset？ vue 借助了vue-loader 