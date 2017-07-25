"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

gulp.task("sass", function () {
    return gulp.src(globalVar.editFolder + "/sass/**/style.scss")
        .pipe(sass())
        .pipe(gulp.dest(globalVar.distFolder + "/css"));

});
