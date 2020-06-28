var gulp = require('gulp'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync').create(),
	concatCss = require('gulp-concat-css'),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('gulp-autoprefixer');


function css_style(done) {
	gulp.src('./src/scss/**/*.scss') 
	.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({overrideBrowserlist: ['last 2 versions']}))
		.pipe(gulp.dest('src/build/'))
		.pipe(browserSync.stream());
}

function sync(done) {
	browserSync.init({
		server: {
			baseDir: "./src/"
		},
		port: 3000
	})
}

function browserReload(done) {
	browserSync.reload();
	done();
}

function watchFile() {
	gulp.watch('./src/scss/**/*.scss', css_style);
	gulp.watch('./**/*.html', browserReload);
}

 gulp.task('default', gulp.parallel(sync, watchFile))