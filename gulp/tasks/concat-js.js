"use strict";

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

gulp.task("concat-js", function () {
    var jsFiles = [globalVar.editFolder + "/js/*.js"];
    if (globalVar.concatJs) {
        jsFiles = globalVar.concatJs;
    }
    return gulp.src(jsFiles)
        .pipe(concat("combined.js"))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(globalVar.distFolder + "/js"));
});
