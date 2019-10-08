# webpack与CodeSplitting 代码分割
## CodeSlitting
- 代码分割和webpack是没有关系的
- 开发中当资源文件过大时，页面加载时间就会越长；浏览器是可以并行加载的；所以我们可以把代码拆分已提高加载速度
- 举例 当我在文件中引入第三方资源'loadsh'时 
```
import _ from 'loadsh';
console.log(_.join(['dd', 'nb']));
```
发包后发现
```
 main.js   1.22 MiB    main  [emitted]  main

```
文件有1.22MiB, 如果我业务逻辑也有1MiB,不进行压缩打包就会有>2MiB的文件，文件过大；并且当我改变业务代码时，重新打包还会产生这么大的文件。所以我们可以采用CodeSplitting

将loadsh的引用单独放在loadsh.js文件中
```
import _ from 'lodash';
window._ = _;
```

改变webpack配置，多入口
```
 entry: {
    main: './src/index.js',
    loadsh: './src/loadsh.js'
},
```
此时打包后就会发现
```
 loadsh.js   1.22 MiB  loadsh  [emitted]  loadsh
   main.js   29.2 KiB    main  [emitted]  main
```
当我们在改变业务逻辑时（第三方库永远不变）只需要加载main.js就可以

## webpack与CodeSplitting

我们还原代码 index.js
```
    import _ from 'lodash';
    console.log(_.join(['dd', 'nb', 'hhhe']));
```
在wepack配置中
```
    optimization: {
        usedExports: true, // 开启treeShaking模式
        splitChunks: {
            chunks: 'all'
        }
    },
```

打包后发现
```
     index.html  242 bytes                [emitted]
        main.js   35.9 KiB          main  [emitted]  main
        vendors~main.js   2.09 MiB  vendors~main  [emitted]  vendors~main
```
会发现webpack自动进行了代码分割生成了vendors~main 

我们看index.js文件发现 我们是在同步执行
如果我们用异步的执行方式
```
    let test = (() => {
        // 异步加载loadsh
        return import('lodash').then((_) => {
            return console.log(_.join(['dd', 'nb'])) 
        })
    });

    test();
```
并把cofig中的配置去掉
```
optimization: {
    usedExports: true, // 开启treeShaking模式
    // splitChunks: {
    //     chunks: 'all'
    // }
},
```
打包后发现

```
      0.js   1.19 MiB       0  [emitted]
index.html  180 bytes          [emitted]
   main.js    956 KiB    main  [emitted]  main
```
webpack自动进行代码分割 把第三方库loadsh打包到0.js