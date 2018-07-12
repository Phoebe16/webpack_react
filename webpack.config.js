const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle-[hash].js'
    },
    devtool: 'eval-source-map',  // 方便调试，在开发阶段使用eval-source-map，在生产阶段一定不要使用
    // 让浏览器监听代码变化，自动刷新，搭建一个本地开发服务器，它基于node.js构建
    devServer: {
        contentBase: './dist',  // 设置为另一个目录下的文件提供本地服务器，默认为根文件夹提供本地服务器
        port: 3000,  // 默认为8080
        inline: true,  // 当源文件改变时会自动刷新页面
        historyApiFallback: true,  // 开发单页应用时很有用，设为true时所有跳转都指向index.html
        hot: true,  // 修改组件代码后，自动刷新实时预览页面修改，配合HotModuleReplacementPlugin
        /* 配置完这些后，JS模块其实还是不能自动热加载的，还需要在你的JS模块中执行一个Webpack提供的API才能实现热加载，
        虽然这个API不难使用，但是如果是React模块，使用我们已经熟悉的Babel(react-transform-hrm)可以更方便的实现功能热加载 */
        // 在调试的时候我们有时需要使用网络接口，使用axios请求数据则会遇到跨域问题，这时可在webpack-dev-server配置代理
        proxy: {
            '/data/*': {
                target: 'http://www.weather.com.cn/',  // 请求将会代理到此配置地址
                secure: false,
                changeOrigin: true
            }
        }
    },
    mode: 'development',
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.less'],
        alias: {
            // filter: path.join(__dirname, 'src/filter')
        }
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,  // 指定启用css-modules
                        localIdentName: '[name]_[local]--[hash:base64:5]'  // 指定css类名格式
                    }
                },
                {
                    loader: 'postcss-loader'
                }]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                },
                {
                    loader: 'less-loader'
                }, 
                {
                    loader: 'postcss-loader'
                }]
            },
            {
                test: /\.(png|jpg|gif|woff|svg|eot|woff2|ttf)$/,
                use: {
                    loader: 'url-loader?limit=8192'  // 限制 8*1024 字节以下的转为base64格式
                },
                exclude: /node_modules/
            }
        ]
    },
    optimization: {

    },
    plugins: [
        new webpack.BannerPlugin('Phoebe'),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.tmp.html')
        }),  // 根据模板打包生成html文件，会自动引入编译打包后的js文件
        new webpack.HotModuleReplacementPlugin(),  // 热加载插件
        new CleanWebpackPlugin('dist/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })  // 打包生成带有hash的文件名，删除之前打包过的多余的文件
    ]
};