var express = require('express');
var webpack = require('webpack'); 
var webpackMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.config');
var complier = webpack(config); // webpack编译器
var app = express();

// 通过wenpack中间件配合express自己写webpack-dev-server 耗精力 可了解 不推荐
app.use(webpackMiddleware(complier, {
    //pulicPath: config.output.publicPath
}))
app.listen(3030, () => {
    console.log('server is listing')
})

// webpack --watch 提高打包效率，当代码变动时自动打包
// webpack-dev-server 在配置文件中做devServer配置，启动一个http服务，当代码改变时既能监听重新打包，对应浏览器也可以自动刷新
// webpackDevMiddleware 同过express快速的建立了一个http服务器，通过webpack和他的配置生成了一个webpack编译器,webpackDevMiddleware监听了文件的变化