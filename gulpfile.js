var gulp = require('gulp');
const babel = require('gulp-babel');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename')





gulp.task('default', ['html','sass','js']);

gulp.task('sass', function(){
   return gulp.src('./css/styles.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public'));
});


gulp.task('html', function(){
  gulp.src('./index.html')
  .pipe(gulp.dest('./public'));
});

// gulp.task('tmpl', function(){
//   gulp.src('./js/templates.html')
//   .pipe(rename('./js/templates.js'))
//   .pipe(gulp.dest('./'));
// });

// add ['tmpl'] vvv before function in 'js' task

gulp.task('js', function(){
    return gulp.src('./js/*.js')
    .pipe(babel({
			presets: ['es2015']
		}))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public'));
});

gulp.task('watch', function(){
    gulp.watch('./css/styles.scss', ['sass']);
    gulp.watch('./js/*.js', ['js']);
    gulp.watch('./index.html', ['html']);
});
