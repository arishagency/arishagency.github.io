
"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    fs = require("fs"),
    customPlumber = require("../lib/plumber"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

gulp.task("sass", function () {
    return gulp.src(globalVar.editFolder + "/sass/style.scss")
.pipe(customPlumber('SCSS Error'))
        .pipe(sass())
        .pipe(gulp.dest(globalVar.distFolder + "/css"));
});