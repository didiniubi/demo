var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-evel-source-map',
    entry: {
        main: './src/index.js'
    },
    output: {
        //publicPath: '/', // 所有打包文件的引用都加根路径
        filename: '[name].js',
        path: path.resolve(__dirname, 'public')
    },
    // 开服务器
    devServer: {
        contentBase: './public', // 告诉服务器从哪里提供内容
        open: true // 启动webpack-dev-server时 自动打开浏览器并访问服务地址
    },
    module: {
        rules: [
            {
                test: /\.css|less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ]
}