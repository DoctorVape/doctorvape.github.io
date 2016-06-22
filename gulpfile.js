var gulp = require('gulp');
const pug = require('gulp-pug2')
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var server = require('gulp-server-livereload');
const OutDir="./bundle"
const SrcDir="./src"




gulp.task('pug', function () {
    return gulp.src(SrcDir+'/*.pug')

        .pipe(pug({ yourTemplate: 'components' })).pipe(gulp.dest(OutDir));
    // => build/views/example.html 
});

gulp.task('sass', () =>
    gulp.src(SrcDir+'/styles/*.scss')
    .pipe(sass({ includePaths: require('node-normalize-scss').includePaths }))
    .pipe(gulp.dest(OutDir+"/styles")));
    


gulp.task('autoprefixer', ['sass'], function () {
    return gulp.src(SrcDir+'/styles/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(OutDir));
});

gulp.task('webserver', function () {
    gulp.src(OutDir)
        .pipe(server({
            defaultFile: 'index.html',
            fallback: OutDir+'/index.html',
            livereload: true,
            directoryListing: false,
            open: false

        }));
});
gulp.task('watch', ['sass', 'pug'], () => {
    gulp.watch(SrcDir+'/styles/*.scss', ['sass']);
    gulp.watch(SrcDir+'/components/*.pug', ['pug']);
    gulp.watch(SrcDir+'/*.pug', ['pug']);
})

gulp.task('default', ['watch','webserver'], function() {
      
});
