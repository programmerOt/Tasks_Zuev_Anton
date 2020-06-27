var gulp = require('gulp'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync').create(),
	concatCss = require('gulp-concat-css'),
	sass = require('gulp-sass');


function css_style(done) {
	gulp.src('./task 1.1/styles/*.css')
		.pipe(concatCss("style.css"))
		.pipe(gulp.dest('./css/'))
		.pipe(browserSync.stream())
	done();
}

function sync(done) {
	browserSync.init({
		server: {
			baseDir: "./task 1.1/"
		},
		port: 3000
	})
}

function browserReload(done) {
	browserSync.reload();
	done();
}

function watchFile() {
	gulp.watch('./task 1.1/styles/*.css', css_style);
	gulp.watch('./**/*.html', browserReload);
	gulp.watch('./task 1.1/styles/*.css',browserReload)
}

 gulp.task('default', gulp.parallel(sync, watchFile))