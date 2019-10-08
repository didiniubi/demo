# Libary打包了解

## 库的多种引入方式
当我们打包一个库文件并在业务代码引用时，会有多种引用方法

- import (esModule)

- require (commonJs)

- require (['libary'], () => {}) () (AMD)

外部引入的时候 会有多种引用方法，为了使这些引用方法都能正常使用可以在webpack中加入配置

```
output: {
    filename: 'libary.js',
    path: path.resolve(__dirname, 'public'),
    libaryTarget: 'umd' // 以任何方式正确的引入
}
```

- 用script标签引入，并且通过全局变量来使用

```
output: {
    filename: 'libary.js',
    path: path.resolve(__dirname, 'public'),
    libraryTarget: 'umd',
    library: 'myLibary'
}
```
打包的代码挂载到了一个全局变量 myLibary上

如果我想挂载在window下
```
output: {
    filename: 'libary.js',
    path: path.resolve(__dirname, 'public'),
    library: 'myLibary',
    libraryTarget: 'window',
}
```

