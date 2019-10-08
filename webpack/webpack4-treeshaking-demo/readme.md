# TreeShaking理解

在在开发者模式进行开发时 我们在sum.js 定义了两个方法
```
export const sum = (a , b) => {
    console.log(a * b, 'a * b');
}

export const add = (a, b) => {
    console.log(a + b, 'a + b');
}
```
在index.js中我只引入应用了其中一个方法，在对代码进行打包后（npx webpack)发现打包后的文件里两个方法都进行了打包

```
/***/ "./src/sum.js":
/*!********************!*\
  !*** ./src/sum.js ***!
  \********************/
/*! exports provided: sum, add */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sum\", function() { return sum; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add\", function() { return add; });\nconst sum = (a, b) => {\n  console.log(a * b, 'a * b');\n};\nconst add = (a, b) => {\n  console.log(a + b, 'a + b');\n};\n\n//# sourceURL=webpack:///./src/sum.js?");

/***/ })

/******/ });
```

### TreeShaking就是把模块里内有应用的东西去掉
## TreeShaking只支持ESMODULE

当我在webpack.config.js里配置
```
optimization: {
    usedExports: true
},
```
重新打包后发现
```

/***/ "./src/sum.js":
/*!********************!*\
  !*** ./src/sum.js ***!
  \********************/
/*! exports provided: sum, add */
/*! exports used: sum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return sum; });\n/* unused harmony export add */\nconst sum = (a, b) => {\n  console.log(a * b, 'a * b');\n};\nconst add = (a, b) => {\n  console.log(a + b, 'a + b');\n};\n\n//# sourceURL=webpack:///./src/sum.js?");

/***/ })
```
bundle里还是保留了未用到的方法 但是添加了一个段/*! exports used: sum */的注释。
### 在开发环境下treeShaking还会保留未用到的代码
现在切换到生成环境,打包后生成的文件代码
```
"use strict";r.r(n);var t,o;t=2,o=4,console.log(t*o,"a * b")}]);
```

可以发现只对用到的方法进行了打包，此时的webpack配置为
```
module.exports = {
    mode: 'production',
    devtool: 'cheap-module-soure-map',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: './public',
        open: true,
        hot: true
    },
    // optimization: {
    //     usedExports: true
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}
```
可以看到optimization是被注释掉的；
### 在生产环境下 TreeShaking模式会自动配置，不需要我们手动配置

## sideEffects

之前提过 TreeShaking模式只对esModule模式有效果，当我们用import引入样式时，样式是没有任何内容导出的，这个时候 就需要我们在packjson里进行配置
```
"sideEffects: ['*.less'] 这样已less结尾的文件就不会进行treeshaking
```

webpack中的usedExports: true会去识别package.json中的sideEffects来剔除无用的模块做tree-shaking 所以usedExports: true 参数生产和开发环境都会配置
