var gulp = require('gulp');

gulp.task('default', function() {
  gulp.src('src/*.html')
    .pipe(gulp.dest('../../build/'));
});
