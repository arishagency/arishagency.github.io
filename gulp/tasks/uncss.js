"use strict";

var gulp = require("gulp"),
    glob = require("glob"),
    uncss = require("gulp-uncss"),
    minifyCSS = require("gulp-minify-css"),
    rename = require("gulp-rename"),
    fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

gulp.task("uncss", ["copy-css"], function () {
    var uncssIgnore;
    if (globalVar.uncssIgnore) {
        uncssIgnore = globalVar.uncssIgnore;
    }
    return gulp.src(globalVar.editFolder + "/css/style.css")
        .pipe(uncss({
            html: glob.sync(globalVar.distFolder +"/**/*.html"),
            ignore: uncssIgnore
        }))
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(globalVar.distFolder +"/css"));
});
