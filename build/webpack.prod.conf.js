process.env.NODE_ENV = 'production';

const baseWebpackConfig = require('./webpack.base.conf.js');

const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

// 生成多个实例，base存放第三方库，app为自定义
let baseCss = new ExtractTextWebpackPlugin('css/base-[contenthash:6].css');
let appCss = new ExtractTextWebpackPlugin('css/app-[contenthash:6].css');

module.exports = merge(baseWebpackConfig, {

    module: {
        rules: [{
            test: /\.(css|less)$/,
            // 合并
            use: appCss.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader']
            }),
            // 排除第三方库
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            // 合并
            use: baseCss.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            }),
            // 限制第三方库
            include: /node_modules/
        }]
    },

    // plugins
    plugins: [
        // 清空打包目录
        new CleanWebpackPlugin(['dist/**/**'], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        }),
        appCss, baseCss,

        // 压缩js
        new UglifyjsWebpackPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            parallel: true
        }),

        // 压缩css
        new OptimizeCssPlugin()
    ]
});