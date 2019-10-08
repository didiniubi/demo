# webpack中的性能优化


## 代码覆盖率

- 我们在做性能优化时 不应该只看重浏览器缓存，更应该看重代码的使用情况，也就是代码应用率
```
document.addEventListener('click', () => {
    let ele = document.createElement('div');
    ele.innerHTML= 'dd';
    document.body.appendChild(ele);
});
```
打开控制台source coverage 工具可以看到 这块代码中 
```
    let ele = document.createElement('div');
    ele.innerHTML= 'dd';
    document.body.appendChild(ele);
```
部分是标红的 这块代码根本没有应用到但还是带包了进去 可以看使用率非常低

对也这种代码 我们可以单独做成个异步模块 再来加载
新建个click.js
```
const click = () => {
    console.log(111)
    let ele = document.createElement('div');
    ele.innerHTML= 'dd';
    document.body.appendChild(ele);
}

export default click;
```
在index.js中异步引入
```

document.addEventListener('click', () => {
    import('./click.js').then(({default: _}) => {
        _();
    })
});
```

这个时候就能看到 代码覆盖率得到了提升
就像我们看webpack的splitchunks的配置chunks默认是异步ansyc就是因为webpack认为只有异步的代码才能提高性能，同步的代码只是做缓存而已意义不大


- 在webpack中有代码分割，TreeShaking等方式帮我们进行优化

- 当我在代码中异步加载一个资源时
```
    document.addEventListener('click', () => {
        return import('lodash').then((_) => {
            console.log(_.join(['dd', 'nb']));
        })
    });
```

打开控制台看见lodash打包后的资源是在我们点击后才会加载的，这样我们第一次进入页面时 并没有加载lodash资源，使页面加速度快一些，但是 我们点击加载资源的同时，加载时需要时间的，虽然只是第一次点击加载需要时间，剩下点击会根据浏览器缓存，但还是不够理想， 只是可以利用webpack提供的prefetching来优化

## prefetching是指在页面主流程加载完成后，利用空余时间自动加载资源

```
document.addEventListener('click', () => {
    return import(/*webpackPrefetching:true*/'lodash').then((_) => {
        console.log(_.join(['dd', 'nb']));
    })
});
```

通过魔法注释的写法 开启Prefetching 在netwrok中可以看到lodash自动加载 当我们在点击的时候发现 lodash文件又加载了一次 但是这次时间非常短

## css代码分割
当我们引入css文件后打包发现webpack将css代码一同打包到了main.js里。我们可以采用mini-css-extract-plugin来进行css代码分割

mini-css-extract-plugin不支持热模块，所以用该插件时一般是在生产环境

用了该插件后 该插件带的loader替换掉style-loader将样式文件挂载到页面中