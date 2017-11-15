'use strick';

//引用模块同步
var gulp = require('gulp');

var sass = require('gulp-sass');

//创建任务

gulp.task('homeSass',()=>{
	//匹配查找sass文件
	//文档流
	gulp.src('./src/sass/*.scss')
	//编译
	.pipe(sass({outputStyle:'expanded'})
	.on('error',sass.logError))
	//输出
	.pipe(gulp.dest('./src/css/'))
});
//监听文件，并自动编译
gulp.task('listener',()=>{
	gulp.watch('./src/sass/*.scss',['homeSass']);
});

//浏览器自动同步更新
var browserSync = require('browser-sync');
gulp.task('autoUpdate',()=>{
	//开启服务器
	browserSync({
		/*server:'./src/',*/
		//代理服务器
		proxy:'http://localhost/webProject',
		//端口
		port:8080,
		files:['./src/**/*.scss','./src/css/*.css','./src/api/*.php']
	});
	//监听文件
	gulp.watch('./src/**/*.scss',['homeSass']);
});