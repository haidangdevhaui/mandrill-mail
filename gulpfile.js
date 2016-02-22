'use strict'
var gulp = require('gulp') ,
    nodemon = require('gulp-nodemon');

gulp.task('default' , function() {
    nodemon({
        script : 'app.js' ,
        ext : 'js' ,
        env : {
            PORT : 3000
        }
    })
        .on('restart' , function() {
            console.log('Restarting...')
        })
});