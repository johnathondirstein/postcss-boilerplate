'use strict'

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
const cssImport = require('postcss-import');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cssvars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const mixins = require('postcss-mixins');
const hexrgba = require('postcss-hexrgba');
const reload = browserSync.reload;

gulp.task('browser-sync', () => {
  browserSync.init({
    server: '.'  
  })
});

gulp.task('styles', () => {
  return gulp.src('./dev/styles/**/*.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
      .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  gulp.src('./dev/scripts/main.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./public/scripts'))
    .pipe(reload({stream: true}));
});

gulp.task('watch', () => {
  gulp.watch('./dev/scripts/**/*.js', ['scripts']);
  gulp.watch('./dev/styles/**/*.css', ['styles']);
  gulp.watch('*.html', reload);
});

gulp.task('default', ['browser-sync','styles', 'scripts', 'watch']);