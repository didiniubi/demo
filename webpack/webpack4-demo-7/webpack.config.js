var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var {CleanWebpackPlugin} = require('clean-webpack-plugin');
var webpack = require('webpack');
module.exports = {
    entry: {
        main: './src/index.js'
    },
    mode: 'development',
    devtool: 'cheap-module-evel-source-tool',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader', // 处理js文件时 babel-loaser只是webpack与babel之间通信的桥梁，并不会真的帮助webpack将es6语法转为es5，真正转换是由@babel/presset-env做的
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './public',
        open: true,
        hot: true
    }
}