const path = require('path');
module.exports = {
    mode: 'production',
    entry: {
        mian: './src/index.js'
    },
    output: {
        filename: 'libary.js',
        path: path.resolve(__dirname, 'public'),
        library: 'myLibary',
        libraryTarget: 'umd',
        
    }
}