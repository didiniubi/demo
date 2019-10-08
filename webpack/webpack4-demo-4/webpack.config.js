var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    mode: 'development', // 开发者模式下 默认sourceMap开启
    // cheap 只告诉你第几行 不告诉你第几列出错 
    // module 不知告诉你业务代码文件 也告诉你loader.或其他第三方资源出错
    // evel 通过evel()的方式将错误抛出去
    // 开发者模式 个人认为最好的devtool 为cheap-module-evel-source-tool 不仅逻辑代码能看到错误 第三方文件也会找到错误
    // 线上代码不需要sourceMap 如果需要可以使用cheap-module-source-tool
    devtool: 'source-map', // 当我开启source-map模式后 打包文件夹中生成.map文件
    //devtool: 'inline-source-map',  使用inline-source-map时 （只要有inline）.map文件直接打包到js文件里去
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].js',
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
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin()
    ]
}