const webpack = require('webpack');
const merge = require('webpack-merge');
const CommonConfig = require('./webpack.common');
let devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-soure-map',
    devServer: {
        contentBase: './public',
        open: true,
        hot: true
    },
    optimization: {
        usedExports: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(CommonConfig, devConfig);