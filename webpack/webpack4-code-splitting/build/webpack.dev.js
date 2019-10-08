const webpack = require('webpack');
const merge = require('webpack-merge');
const Common = require('./webpack.common');
const dev = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: '../public',
        open: true,
        hot: true
    },
    optimization: {
        usedExports: true, // 开启treeShaking模式
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() // 开启热模块
    ]
}
module.exports = merge(Common, dev);