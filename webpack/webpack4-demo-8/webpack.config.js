const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

// 1 - 8 小结
module.exports = {
    mode: 'development', // 以开发者的模式进行打包，打包的代码不会被压缩
    entry: {
        main: './src/index.js'
    },
    devtool: 'cheap-module-eval-source-map', 
    // 采用sourceMap sourceMap是一种映射关系
    // cheap生成sourceMap时 可以不带列信息 只带行信息 cheap对loader里面的代码不做映射，只映射我们的业务代码
    // module 指对loader里面的代码也做映射关系
    // eval 指一直执行方式eval()
    // source-map指 生成.map文件 但因为用到了eval所以map会被打包到我们输出的文件
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        // 在哪个目录起用这个服务
        contentBase: './public',
        open: true, // 服务器重启时打开一个网页
        hot: true // 开启热更新
    },
    // 遇到文件、模块打包方式
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader' // babel-loader配置放在.babelrc
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}