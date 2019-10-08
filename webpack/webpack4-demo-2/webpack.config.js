module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.png|png$/,
                use: {
                    loader: 'file-loader'
                }
            }, {
                test: /\.css|less$/,
                // loader是有执行顺序的 先下后上，先右后左
                use:  [
                    'style-loader', // 得到css文件后 将文件挂载在head上执行
                    'css-loader', // 分析出几个css文件之间的关系合并成一个css文件
                    'less-loader', 
                    'postcss-loader', // 自动补充前缀 -moz- -webkit-
                ]
            }
        ]
    }
}