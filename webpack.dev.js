'use strict';

const path = require('path');
const fs   = require('fs');
const config = require('./config.json');
const debugPath = config.path.debug + '/';
const srcPath = config.path.src;

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (file)=>{
    var _name,extractLESS,srcDir,opt={};


    if(file){
        file = file.replace(/\\/g,'/');

        var _name = file.replace('.js','');
        _name = _name.replace(/\//g,'_');
        var extractLESS = new ExtractTextPlugin('css/'+ _name +'.css');
        var srcDir = srcPath+'/js/';
        opt.entry = srcDir+file;
        opt.output = {
            publicPath: debugPath,
            filename: 'js/'+_name+'.js'
        };
        //opt.watch = true;
    }else{
        extractLESS = new ExtractTextPlugin('css/[name].css');
        opt.output = {
            filename: "js/[name].js",
            publicPath: debugPath
        };
    }

    //默认 模块
    opt.module = {
        //各种加载器，即让各种文件格式可用require引用
        loaders: [
            {
                test: /\.less$/,
                loader: extractLESS.extract(
                    'css?sourceMap!' +
                    'less?sourceMap!'+
                    'autoprefixer?browsers=last 2 versions'
                )
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: "url?limit=8192&name=img/[name].[ext]"+"!img?minimize&progressive=true&optimizationLevel=5"
            },
            {
                test: /\.js$/,
                loader: "babel",
                query:{presets: ['es2015']}
            }
        ]
    };

    opt.plugins = [extractLESS];


    return opt;
};
