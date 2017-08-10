"use strict";

var gulp = require("gulp"),
    removeDir = require("../lib/remove-dir"),
    fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

gulp.task("clean", function () {
    return removeDir([
        globalVar.distFolder + "/css",
        globalVar.distFolder + "/fonts",
        globalVar.distFolder + "/images",
        globalVar.distFolder + "/js"
        ]);
});
