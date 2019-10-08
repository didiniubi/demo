const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
module.exports = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, 'public')
    },
    // devServer: {
    //     contentBase: 'public',
    //     open: true,
    //     hot: true
    // },
    optimization: {
        usedExports: true, // 识别package.json里面的sideEffects配置，剔除某些模块做treeshaking
        splitChunks: {
            chunks: 'all' // 不管是同步代码还是异步都开启代码分割模式 默认是异步代码直接进行代码分割
        }  
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin()
    ]
}