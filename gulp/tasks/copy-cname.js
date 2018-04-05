"use strict";

var gulp = require("gulp"),
    fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

gulp.task("copy-cname", function () {
    return gulp.src([globalVar.editFolder + "/CNAME"])
        .pipe(gulp.dest(globalVar.distFolder));
});
