"use strict";

var gulp = require("gulp"),
    fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

gulp.task("copy-fonts", function () {
    return gulp.src([globalVar.editFolder + "/fonts/**/*"])
        .pipe(gulp.dest(globalVar.distFolder + "/fonts"));
});
