const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.conf.js');

module.exports = merge(baseWebpackConfig, {

    module: {
        rules: [{
            test: /\.(css|less)$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            }, {
                loader: 'less-loader'
            }]
        }]
    },

    // 开发模式
    devtool: 'source-map',

    // 本地服务器
    devServer: {
        // 服务器文件路径
        contentBase: path.resolve(__dirname, '../dist'),
        // 开启GZIP
        compress: true
    }
});