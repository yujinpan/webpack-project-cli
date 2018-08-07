const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

    // 入口文件路径
    entry: {
        app: path.resolve(__dirname, '../bootstrap.js'),
    },

    // 输出
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name]-[chunkhash:6].js',
        publicPath: '/'
    },

    module: {

        // 规则
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }],
            // 排除文件夹
            exclude: /node_modules/
        }, {
            // 加载css中的字体或图片
            test: /(\.ttf|\.woff2|\.woff|\.eot|\.svg|\.dtd)/,
            use: [{
                loader: "file-loader",
                options: {
                    limit: '10000',
                    outputPath: 'fonts',
                    name: '[name].[hash:6].[ext]'
                }
            }]
        }, {
            test: require.resolve('jquery'),
            use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },
                {
                    loader: 'expose-loader',
                    options: '$'
                }
            ]
        }, {
            test: require.resolve('lodash'),
            use: [{
                loader: 'expose-loader',
                options: '_'
            }]
        }, {
            // 将html文件转换为字符串
            test: /\.html$/,
            use: [{
                loader: "raw-loader"
            }]
        }],
    },

    // plugins
    plugins: [

        // 生成默认模板
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html')
        }),

        // 提取第三方库
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor-[chunkhash:6].js',
            minChunks: function(module) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                );
            }
        }),

        // 提取自定义的导入的公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/common-[chunkhash:6].js',
            minChunks: Infinity
        })
    ]
};