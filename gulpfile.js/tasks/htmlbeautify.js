const htmlbeautify = require('gulp-html-beautify')
const gulp = require('gulp')
const path = require('path')
gulp.task('htmlbeautify', function () {
  var options = {
    indentSize: 2
  }
  gulp.src('./src/html/*.html')
   .pipe(htmlbeautify(options))
   .pipe(gulp.dest('./public/'))
})
