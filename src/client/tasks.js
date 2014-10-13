var util = require('util');

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var cb = require('gulp-cache-breaker');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var del = require('del');
var gutil = require('gulp-util');

var paths = require('./paths');

if(gutil.env.silent) {
  gutil.log = gutil.noop;
}

/**
 * Removes all build artifacts.
 */
gulp.task('clean', function(cb) {
  gutil.log(util.format('Removing artifacts from %s',
      gutil.colors.magenta(paths.build)));
  return del(paths.build + '/**/*', { force: true }, cb);
});

/**
 * Copies all html files to the build directory.
 */
gulp.task('html', [ 'clean', 'js', 'less', 'assets' ], function() {
  gutil.log(util.format('Copying %s to %s',
      gutil.colors.magenta(paths.html), gutil.colors.magenta(paths.build)));
  return gulp.src(paths.html)
      .pipe(cb(paths.build))
      .pipe(gulp.dest(paths.build));
});


/**
 * Compiles LESS files.
 */
gulp.task('less', [ 'clean' ], function() {
  gutil.log(util.format('Compiling %s to %s',
      gutil.colors.magenta(paths.less), gutil.colors.magenta(paths.build)));
  return gulp.src(paths.less)
    .pipe(less({ compress: true }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(paths.build));
});

/**
 * Compiles Javascript.
 */
gulp.task('js', [ 'clean' ], function() {
  gutil.log(util.format('Compiling %s to %s',
      gutil.colors.magenta(paths.js), gutil.colors.magenta(paths.build)));
  return gulp.src(paths.js)
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest(paths.build));
});

/**
 * Copies static assets.
 */
gulp.task('assets', [ 'clean' ], function() {
  gutil.log(util.format('Copying %s to %s',
      gutil.colors.magenta(paths.assets), gutil.colors.magenta(paths.build)));
  return gulp.src(paths.assets, { base: paths.src })
      .pipe(gulp.dest(paths.build));
});
