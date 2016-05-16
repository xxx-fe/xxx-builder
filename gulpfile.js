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

/*webpack 配置相关*/
var configPro = require('./webpack.config');
var configDebugCtrl = require('./webpack.dev');


/*源码相关-针对gulp 监听或者编译  凡是以_开头的文件或者以_开头的文件夹下的文件都不执行编译*/
const _htmlSrcPath = srcDir+'/html/';
const _htmlFile = [_htmlSrcPath+'*/*.html',`!${_htmlSrcPath}**/_*/*.html`,`!${_htmlSrcPath}**/_*.html`];//html

const _jsSrcPath = srcDir+'/js/';
const _jsFile = [`${_jsSrcPath}/**/*.js`,`!${_htmlSrcPath}**/_*/*.js`,`!${_htmlSrcPath}**/_*.js`];//js

const _jsxSrcPath = srcDir+'/js/';
const _jsxFile = [`${_jsSrcPath}/**/*.jsx`,`!${_htmlSrcPath}**/_*/*.jsx`,`!${_htmlSrcPath}**/_*.jsx`];//jsx

/*监听html*/
gulp.task('watchHtml',()=>{
    watch(_htmlFile)
    .pipe(fileinclude('@@'))
    .pipe(gulp.dest(htmlViews));
});

/*编译html*/
gulp.task('buildHtml',()=>{
    gulp.src(_htmlFile)
    .pipe(fileinclude('@@'))
    .pipe(gulp.dest(htmlViews))
    .on('end',function(){
        console.log('html is finished!');
    });
});


/*监听js*/
gulp.task('watchJs',()=>{
    watch(_jsFile,(file)=>{
        gulp.src(file.path)
            .pipe(webpack(configDebugCtrl(file.relative)))
            .pipe(gulp.dest(debugDir+'/'));
    });
});

/*debug 模式下 编译js*/
gulp.task('buildJs',()=>{
    gulp.src(_jsFile)
    .pipe(named(function(file){
        var _file = file.relative.replace(/\\/g,'/');
        _file = _file.replace(/\//g,'_');
        file.named  = path.basename(_file, path.extname(_file));

        this.queue(file);
    }))
    .pipe(webpack(configDebugCtrl()))
    .pipe(gulp.dest(debugDir+'/')).on('end',function(){
        console.log('js is finished!');
    });
});


/*监听jsx*/
gulp.task('watchJsx',()=>{
    watch(_jsxFile,(file)=>{
        gulp.src(file.path)
            .pipe(webpack(configDebugCtrl(file.relative)))
            .pipe(gulp.dest(debugDir+'/'));
    });
});

/*debug 模式下 编译jsx*/
gulp.task('buildJsx',()=>{
    gulp.src(_jsxFile)
    .pipe(named(function(file){
        var _file = file.relative.replace(/\\/g,'/');
        _file = _file.replace(/\//g,'_');
        file.named  = path.basename(_file, path.extname(_file));

        this.queue(file);
    }))
    .pipe(webpack(configDebugCtrl()))
    .pipe(gulp.dest(debugDir+'/')).on('end',function(){
        console.log('js is finished!');
    });
});

/*dev环境编译执行*/
gulp.task('dev',()=>{
    gulp.run(['buildHtml','buildJs','buildJsx','watchHtml','watchJs','watchJsx']);
});


/*生产环境编译执行*/
gulp.task('www', ()=>{
    gulp.src(_jsFile.concat(_jsxFile))
        .pipe(webpack(configPro))
        .pipe(gulp.dest(distDir+'/'))
        .on('end',function(){
            console.log('js is finished!');
        });

    gulp.run('buildHtml');

});
