"use strict";

var gulp = require("gulp"),
    fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

gulp.task("copy-assets", ["copy-fonts"], function () {
    return gulp.src([globalVar.editFolder + "/favicon.ico", globalVar.editFolder + "/*.png"])
        .pipe(gulp.dest(globalVar.distFolder));
});
