'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	csso = require('gulp-csso'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require("gulp-notify"),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    browserSync.watch('src', browserSync.reload)
});
 
gulp.task('sass', function () {
  return gulp.src('src/assets/sass/main.sass')
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
    		browsers: ['last 10 versions'],
            cascade: false
        }))
    .on("error", notify.onError({
        message: "Error: <%= error.message %>",
        title: "sass"
      }))
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/assets/css/'));
});

gulp.task('watch', function () {
  gulp.watch('src/assets/sass/**/*.sass', gulp.series('sass')),
  gulp.watch['src/*.html', 'src/assets/js/*.js']
});

gulp.task('default', gulp.series(
	gulp.parallel('sass'),
	gulp.parallel('watch', 'serve')
	));
