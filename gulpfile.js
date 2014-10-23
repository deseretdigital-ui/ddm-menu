var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');



gulp.task('default', ['example']);



gulp.task('watch', ['default'], function() {
  gulp.watch(['./src/**/*'], ['default']);
});



gulp.task('example', function () {
  gulp.src('./src/menu.*')
    .pipe(gulp.dest('./example'));

  gulp.src('./bower_components/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('./example'));
});



gulp.task('ghpages', ['example'], function () {
    return gulp.src('./example')
      .pipe(plugins.ghPages());
});
