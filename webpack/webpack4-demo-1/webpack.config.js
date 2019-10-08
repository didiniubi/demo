// commonJs模块
var path = require('path');
module.exports = {
    mode: 'development', // 打包模式 默认为production 打包文件会被压缩； mode为development 时打包出的文件不会被压缩
    entry: './src/index.js', // 打包入口文件
    output: {
        filename: 'bundle.js', // 打包出文件名称
        path: path.resolve(__dirname, 'bundle')// 打包出文件路径 该路径为绝对路径
    },
    module: {
        rules: [{
            test: /\.jpg$/,
            use: {
                loader: 'file-loader'
            }
        }]
    }
}