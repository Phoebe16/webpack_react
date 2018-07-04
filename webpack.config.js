const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',  // 方便调试，在开发阶段使用eval-source-map，在生产阶段一定不要使用
    // 让浏览器监听代码变化，自动刷新，搭建一个本地开发服务器，它基于node.js构建
    devServer: {
        // contentBase: './public',  // 设置为另一个目录下的文件提供本地服务器，默认为根文件夹提供本地服务器
        port: 3000,  // 默认为8080
        inline: true,  // 当源文件改变时会自动刷新页面
        historyApiFallback: true  // 开发单页应用时很有用，设为true时所有跳转都指向index.html
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'env', 'react'
                        ]  // 解析ES6的babel-preset-env包和解析JSX的babel-preset-react
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
};