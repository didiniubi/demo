const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].[hash:5].js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, '../public')
    },
    optimization: {
        usedExports: true // 开启tree-shaking
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin()
    ]
}

