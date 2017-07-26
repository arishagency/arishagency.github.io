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
    return gulp.src(globalVar.distFolder + "/css/style.css")
        .pipe(uncss({
            html: glob.sync(globalVar.distFolder +"/**/*.html"),
            ignore: uncssIgnore
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(globalVar.distFolder +"/css"));
});
