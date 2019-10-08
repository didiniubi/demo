const merge = require('webpack-merge');
const Common = require('./webpack.common');
const prod = {
    mode: 'poduction',
    devtool: 'cheap-module-source-map'
}

module.exports = merge(Common, prod);