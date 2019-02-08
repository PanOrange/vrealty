const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const del = require('del');
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglifyCss = require('gulp-uglifycss');
// Prevent pipe breaking caused by errors from gulp plugins
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const reload = browserSync.reload;

const clean = () => del(['../build'], {force:true});

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "../build/"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function html() {
  return gulp
    .src('../src/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('../build'));
}

function css() {
  return gulp
    .src('../src/sass/*.sass', {sourcemaps: true})
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(uglifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('../build/css', {sourcemaps: true}));
}

function js() {
  return gulp
    .src('../src/**/*.js', {sourcemaps: true})
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('../build/js', {sourcemaps: true}));
}

const watch = () => {
  gulp.watch('../src/templates/*.pug', gulp.series(html, browserSyncReload));
  gulp.watch('../src/sass/*.sass', gulp.series(css, browserSyncReload));
};

exports.default = gulp.series(clean, html, css, js, browserSync, watch );