/*
    *@description: gulp  任务
*/
const path = require('path');
const gulp = require('gulp');
const watch = require('gulp-watch');

const webpack = require('gulp-webpack');
const fileinclude = require('gulp-file-include');
const named = require('vinyl-named');

/*设置相关*/
const config = require('./config.json');
const srcDir = config.path.src;
const debugDir = config.path.debug;
const distDir = config.path.dist;
const htmlViews = config.htmlViews;
const appJsPath = config.appJsPath;

/*webpack 配置相关*/
var configPro = require('./webpack.config');
var configDebugCtrl = require('./webpack.dev');


/*源码相关-针对gulp 监听或者编译  凡是以_开头的文件或者以_开头的文件夹下的文件都不执行编译*/
const _htmlSrcPath = srcDir+'/html/';
const _htmlFile = [
    _htmlSrcPath+'*/*.html',
    `!${_htmlSrcPath}**/_*/*.html`,
    `!${_htmlSrcPath}**/_*.html`
];//html

const _jsSrcPath = srcDir+'/js/';
const _jsFile = [
    `${_jsSrcPath}/${appJsPath}/**/*.js?(x)`,
    `!${_htmlSrcPath}**/_*/*.js?(x)`,
    `!${_htmlSrcPath}**/_*.js?(x)`
];//js jsx


/*监听html*/
gulp.task('watchHtml',()=>{
    //{events:['add', 'change']} 监听 新增、修改
    watch(_htmlFile,{events:['add', 'change']})
    .pipe(fileinclude('@@'))
    .pipe(gulp.dest(htmlViews));
});

/*编译html*/
gulp.task('buildHtml',()=>{
    gulp.src(_htmlFile)
    .pipe(fileinclude('@@'))
    .pipe(gulp.dest(htmlViews))
    .on('end',()=>{
        console.log('html is finished!');
    });
});

var jsWatchList = new Set();

/*监听js*/
gulp.task('watchJs',()=>{
    //{events:['add', 'change']} 监听 新增、修改
    watch(_jsFile,{events:['add', 'change']},(file)=>{
        if(jsWatchList.has(file.path)){
            return false;
        }else{
            jsWatchList.add(file.path);
            gulp.src(file.path)
                .pipe(webpack(configDebugCtrl(file.relative)))
                .pipe(gulp.dest(debugDir+'/'))
                .on('end',()=>{
                    console.log(file.relative+' is complite!');
                });
        }

    });
});

/*debug 模式下 编译js*/
gulp.task('buildJs',()=>{
    gulp.src(_jsFile)
    .pipe(named(function(file){
        jsWatchList.add(file.path);

        var _file = file.relative.replace(/\\/g,'/');
        _file = _file.replace(/\//g,'_');
        file.named  = path.basename(_file, path.extname(_file));

        this.queue(file);
    }))
    .pipe(webpack(configDebugCtrl()))
    .pipe(gulp.dest(debugDir+'/'))
    .on('end',()=>{
        console.log('js is finished!');
    });
});


/*dev环境编译执行*/
gulp.task('dev',['buildHtml','buildJs','watchHtml']);


/*生产环境编译执行*/
gulp.task('build', ['buildHtml'],()=>{
    gulp.src(_jsFile)
        .pipe(named(function(file){
            var _file = file.relative.replace(/\\/g,'/');
            _file = _file.replace(/\//g,'_');
            file.named  = path.basename(_file, path.extname(_file));

            this.queue(file);
        }))
        .pipe(webpack(configPro))
        .pipe(gulp.dest(distDir+'/'))
        .on('end',function(){
            console.log('js is finished!');
        });

});
