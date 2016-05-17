/*
    *@description 构建模式配置
*/

'use strict';

const path = require('path');
const fs   = require('fs');

const config = require('./config.json');
//const distPath = config.path.dist + '/';

var nameStr = '[name].[hash:6]';
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractLESS = new ExtractTextPlugin('css/'+ nameStr +'.css');

var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin({filename:'map.json',path: path.join(__dirname, 'dist', 'map')});


module.exports = {
  devtool: "source-map",    //生成sourcemap,便于开发调试
  output: {
      //path: path.join(__dirname, distPath),//文件输出目录
      //publicPath: distPath,//用于配置文件发布路径，如CDN或本地服务器
      filename: "js/"+ nameStr +".js"      //根据入口文件输出的对应多个文件名
  },
  module: {
    //各种加载器，即让各种文件格式可用require引用
    loaders: [
      // { test: /\.css$/, loader: "style-loader!css-loader"},
        {
            test: /\.less$/,
            loader: extractLESS.extract(
                //'less?sourceMap!'+
                //'css?sourceMap!' +
                'css!less!'+
                'autoprefixer?browsers=last 2 versions'
            )
        },
        {
            test: /\.(jpg|png|gif)$/,
            loader: "url?limit=8192&name=img/"+ nameStr +".[ext]"+"!img?minimize&progressive=true&optimizationLevel=5"
        },
        {
            test: /\.js$/,
            loader: "babel",
            query:{presets: ['es2015']}
        },
        {
            test: /\.jsx$/,
            loader: 'babel-loader!jsx-loader?harmony'
        }
    ]
  },
  resolve: {
    //配置别名，在项目中可缩减引用路径
    alias: {}
  },
  plugins: [
      extractLESS,
      assetsPluginInstance,
      //设置这个可以忽略压缩时产生的警告
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
      }),
      new webpack.optimize.CommonsChunkPlugin({
          name: 'common',
          filename: 'js/'+ nameStr +'.js'
      })
  ]
};
