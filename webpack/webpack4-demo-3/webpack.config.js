var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成html 文件并引入打包后的文件
var {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    mode: 'development',
    // 两个入口文件 一个打包到main.js 中一个打包到sub.js去
    entry: {
        main: './src/index.js',
        sub: './src/index.js',
    }, // 打包文件默认叫main.js  entry: './src/index.js'等同于 entry: { main: './src/index.js'}
    output: {
        publicPath: 'https://cdn.com.cn', //将打包后的资源放在cdn上
        filename: '[name].js', // 多文件打包 对打包后的文件重命名
        path: path.resolve(__dirname, 'public')
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
    // plugin可以在webpack运行到某个时刻帮助webpack做某些事情
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // 生成html的模板文件 打包之后运行
        }),
        new CleanWebpackPlugin(), // 打包之前运行 将public目录删除
    ]
}