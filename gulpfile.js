var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var sequence = require('gulp-sequence');
var uglify = require('gulp-uglify');
var cleanUp = require('gulp-clean');
var transpilers = [
  { type: 'amd', suffix: '.amd' },
  { type: 'amdStrict', suffix: '.amd-strict' },
  { type: 'common', suffix: '' },
  { type: 'commonStrict', suffix: '.strict' },
  { type: 'ignore', suffix: '.ignore' },
  { type: 'system', suffix: '.system' },
  { type: 'umd', suffix: '.umd' },
  { type: 'umdStrict', suffix: '.umd-strict' }
];

transpilers.forEach(function eachTranspiler(transpiler) {
  gulp.task(`transpile.${transpiler.type}`, function transpilerTask() {
    return gulp
      .src(['index.js'])
      .pipe(babel({
        modules: transpiler.type
      }))
      .pipe(rename(`ng-confirm${transpiler.suffix}.js`))
      .pipe(gulp.dest('dist'))
    ;
  });
});

gulp.task('minify', function minify() {
  return gulp
    .src(['dist/*.js'])
    .pipe(uglify({
      mangle: false,
      compress: true
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'))
  ;
});

gulp.task('transpile', function transpile(done) {
  sequence(['clean'], transpilers.map((item) => `transpile.${item.type}`), 'minify')(done);
});

gulp.task('clean', function clean() {
  return gulp
    .src('dist/**/*.js', { read: false })
    .pipe(cleanUp())
  ;
});

gulp.task('dev', function dev() {
  gulp.watch(['index.js'], ['transpile']);
});

gulp.task('lint', function gulpLint() {
  return gulp
    .src(['!dist/**/*', '!node_modules/**/*', '**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
  ;
});
