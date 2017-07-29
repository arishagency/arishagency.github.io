"use strict";

var gulp = require("gulp"),
    fs = require("fs"),
    minifyCSS = require("gulp-minify-css"),
    fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

gulp.task("copy-css", ["sass"], function () {
    var styleSheet = globalVar.styleSheet;
    return gulp.src(globalVar.editFolder + "/css/**/*.css")
        .pipe(minifyCSS())
        .pipe(gulp.dest(globalVar.distFolder + "/css"));
});
