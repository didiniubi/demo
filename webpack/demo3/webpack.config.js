module.exports = {
    entry: {
        app: './app.js',
        output: {
            filename: '[name].min.[hash:5].js'
        },
        module: {
            rules: [
                {
                    test: '/\.js$/',
                    use: 'babel-loader'
                }
            ]
        }
    }
}