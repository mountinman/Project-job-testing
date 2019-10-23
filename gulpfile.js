const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require("gulp-sourcemaps");
var plumber = require("gulp-plumber");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var postcss = require('gulp-postcss');

// Copy html file to dist folder
gulp.task("copyHtml", function() {
    gulp.src("src/*.html").pipe(gulp.dest("dist"));
  });
  
  // Scripts
  gulp.task("script", function() {
    gulp
      .src("src/js/*.js")
      .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(concat("main.js"))
      .pipe(gulp.dest("dist/js")) 
      .pipe(uglify())
      .pipe(rename({ extname: ".min.js" }))
      .pipe(sourcemaps.write("maps"))
      .pipe(gulp.dest("dist/js"));
  });

//compile Sass and autoprefix compiled files for distribution (only clean code)
gulp.task('dist', function(){
    gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
          browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist/css'));
  });  

//compile Sass and autoprefix compiled files for development
gulp.task('src', function(){
    gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
          browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('src/css'));
  });  

//postcss-normalize
gulp.task('css', function () {
    gulp.src('src/css/*.css').pipe(
        postcss([
            require('postcss-normalize')({ browsers: 'last 3 versions'})
        ])
    ).pipe(
        gulp.dest('dist/css')
    );
});    
// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});


// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./src"  
    });

    gulp.watch(['src/scss/layout/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['serve']);
gulp.task("sendDist", ["copyHtml", "script","dist", "css"]);
