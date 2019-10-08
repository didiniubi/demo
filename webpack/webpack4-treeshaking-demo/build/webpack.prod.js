
const merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const prodConfig =  {
    mode: 'production',
    devtool: 'cheap-module-soure-map',
}

module.exports = merge(CommonConfig, prodConfig);