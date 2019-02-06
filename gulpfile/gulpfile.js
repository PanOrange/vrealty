const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglifyCss = require('gulp-uglifycss');
// Prevent pipe breaking caused by errors from gulp plugins
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');


// var connect = require('gulp-connect');
// var livereload = require('gulp-livereload');
// var rigger = require('gulp-rigger');
// var sourcemaps = require('gulp-sourcemaps');

// var path = require('./path');

// gulp.task('connect', () => {
// 	connect.server({
// 		root: 'web',
// 		livereload: true
// 	})
// });
//
// gulp.task('html', () => {
// 	gulp.src(path.src.html)
// 		.pipe(rigger())
// 		.pipe(gulp.dest(path.web.html))
// 		.pipe(connect.reload());
// });
//
// gulp.task('css', () => {
// 	gulp.src(path.src.css)
// 		.pipe(stylus({
// 			use: nib()
// 		}))
// 		.pipe(concatCss('style.css'))
// 		.pipe(gulp.dest(path.web.css))
// 		.pipe(connect.reload())
// });
//
// gulp.task('js', () => {
// 	gulp.src(path.src.js)
// 		.pipe(sourcemaps.init())
// 		.pipe(babel({
//             presets: ["es2015"],
//             plugins: ["transform-object-rest-spread"]
//         }))
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest(path.web.js))
// 		.pipe(connect.reload())
// });
//
// gulp.task('watch', () => {
// 	gulp.watch(path.src.html, ['html']);
// 	gulp.watch(path.src.css, ['css']);
// 	gulp.watch(path.src.js, ['js']);
// });
//
// gulp.task('default', ['connect', 'html', 'css', 'js', 'watch']);

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
  return gulp.src('../src/templates/*.html')
    // .pipe(pug())
    .pipe(gulp.dest('../build'));
}

function css() {
  return gulp
    .src('../src/sass/*.sass', {sourcemaps: true})
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    // .pipe(postcss([ autoprefixer() ]))
    // .pipe(sourcemaps.write('.'))
    .pipe(sass())
    .pipe(uglifyCss())
    // .pipe(plumber.stop())
    .pipe(gulp.dest('../build/css', {sourcemaps: true}))
    .pipe(browsersync.stream());
}

function js() {
  return gulp
    .src('../src/**/*.js', {sourcemaps: true})
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('../build/js', {sourcemaps: true}));
}

// exports.js = js;
// exports.css = css;
// exports.html = html;
// exports.default = parallel(html, css, js);

exports.default = gulp.parallel(css, html, js);