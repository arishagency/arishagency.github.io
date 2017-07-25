"use strict";

var gulp = require("gulp"),
    markdownToJson = require("gulp-markdown-to-json"),
    marked = require("marked"),
    fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

gulp.task("content", function () {
    return gulp.src(globalVar.editFolder + "/content/**/*.md")
        .pipe(markdownToJson(marked))
        .pipe(gulp.dest(globalVar.distFolder + "/content"));
});
