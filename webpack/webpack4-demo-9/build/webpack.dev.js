const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const dev = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: '../public',
        open: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(common, dev);