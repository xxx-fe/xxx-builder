const path = require('path');
const gulp = require('gulp');
const watch = require('gulp-watch');

const webpack = require('gulp-webpack');
const fileinclude = require('gulp-file-include');
const named = require('vinyl-named');


const srcDir = path.join(__dirname, "src/");
const debugDir = path.join(__dirname, "debug/");
const srcJs = '/js/app/';
const srcHtml = '/html/';


var configPro = require('./webpack.config');
var configDebugCtrl = require('./webpack.dev');



/*监听html*/
gulp.task('listenHtml',()=>{
    watch([srcDir+srcHtml+'*/*.html','!'+srcDir+srcHtml+'_common/*.html'])
    .pipe(fileinclude('@@'))
    .pipe(gulp.dest('../html'));
});


/*监听js*/
gulp.task('listenJs',()=>{
    gulp.src(['src/js/**/*.js','!**/_*.js','!**/_*/*.js','!**/avalon.js','!**/zepto.js'])
        .pipe(named(function(file){
            //console.log(file.path,file.relative, path.basename(file.path, path.extname(file.path)));
            var _file = file.relative.replace(/\\/g,'/');
            _file = _file.replace(/\//g,'_');
            file.named  = path.basename(_file, path.extname(_file));

            this.queue(file);
        }))
        .pipe(webpack(configDebugCtrl()))
        .pipe(gulp.dest('debug/'));

    watch(['src/js/**/*.js','!**/_*.js','!**/_*/*.js','!**/avalon.js','!**/zepto.js'],function(file){
        gulp.src(file.path)
            .pipe(webpack(configDebugCtrl(file.relative)))
            .pipe(gulp.dest('debug/'));
    });
        //.pipe(mkfile())
        //.pipe(gulp.dest('debug/'));
});

/*html编译执行*/
gulp.task('html',()=>{
    gulp.src([srcDir+srcHtml+'*/*.html','!'+srcDir+srcHtml+'_common/*.html'])
        .pipe(fileinclude('@@'))
        .pipe(gulp.dest('../html'))
        .on('end',function(){
            console.log('html is finished!');
        });
});


/*dev环境编译执行*/
gulp.task('dev',()=>{
    gulp.run('html','listenHtml','listenJs');
});


/*生产环境编译执行*/
gulp.task('www', ()=>{
    gulp.src(srcDir+srcJs+'*.js')
        .pipe(webpack(configPro))
        .pipe(gulp.dest('dist/'))
        .on('end',function(){
            console.log('js is finished!');
        });

    gulp.run('html');

});