"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass");

gulp.task("sass", function () {
    return gulp.src("./src/sass/**/style.scss")
        .pipe(sass())
        .pipe(gulp.dest("./build/css"));

});
