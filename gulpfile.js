var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');



gulp.task('default', ['watch']);



gulp.task('watch', ['build'], function () {
  gulp.watch([
    './src/**/*',
    './example/index.html'
  ], ['build']);
});



gulp.task('build', ['example']);



gulp.task('example', function () {
  gulp.src('./src/menu.*')
    .pipe(gulp.dest('./example'));

  return gulp.src([
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/fastclick/lib/fastclick.js'
  ]).pipe(gulp.dest('./example'));
});



gulp.task('ghpages', ['example'], function () {
    return gulp.src('./example/**/*')
      .pipe(plugins.ghPages());
});
