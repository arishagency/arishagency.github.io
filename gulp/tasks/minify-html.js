"use strict";

var gulp = require("gulp"),
    minifyHTML = require("gulp-minify-html"),
    fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

gulp.task("minify-html", ["compile"], function () {
    return gulp.src(globalVar.distFolder + "/**/*.html")
        .pipe(minifyHTML({
            comments: false,
            spare: true
        }))
        .pipe(gulp.dest(globalVar.distFolder));
});
