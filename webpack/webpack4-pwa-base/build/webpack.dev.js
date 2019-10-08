const merge = require('webpack-merge');
const common = require('./webpack.common');
const dev = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './public',
        open: true
    }
}

module.exports = merge(common, dev);