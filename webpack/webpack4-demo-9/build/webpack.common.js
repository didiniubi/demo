const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
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
        splitChunks: {
            chunks: 'all', // 开启tree-shaking模式
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'lodash',
            Jquery: 'jquery',
            'window.Jquery': 'jquery'
        })
    ]
}