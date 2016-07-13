var gulp = require('gulp');
var pug = require('gulp-pug2')
var server = require('gulp-server-livereload');

gulp.task('pug', function () {
    return gulp.src('jade/*.pug')
        .pipe(pug({ yourTemplate: 'components' })).pipe(gulp.dest(""));
    // => build/views/example.html 
});

gulp.task('webserver', function () {
    gulp.src("")
        .pipe(server({
            defaultFile: 'products.html',
            fallback: 'products.html',
            livereload: true,
            directoryListing: false,
            open: false

        }));
});
gulp.task('watch', ['pug'], () => {
    gulp.watch('jade/*.pug', ['pug']);
    gulp.watch('jade/components/*.pug', ['pug']);
})

gulp.task('default', ['watch','webserver'], function() {
      
});