process.env.NODE_ENV = 'production';

const baseWebpackConfig = require('./webpack.base.conf.js');
const prodWebpackConfig = require('./webpack.prod.conf.js');
const devWebpackConfig = require('./webpack.dev.conf.js');

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

module.exports = merge(prodWebpackConfig, {

    // 开发模式
    devtool: 'cheap-source-map',

    // 本地服务器
    devServer: {
        // 服务器文件路径
        contentBase: path.resolve(__dirname, '../dist'),
        // 开启GZIP
        compress: true
    }
});