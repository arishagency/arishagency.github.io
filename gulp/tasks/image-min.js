"use strict";

var gulp = require("gulp"),
    imageminMozjpeg = require("imagemin-mozjpeg"),
    pngquant = require("imagemin-pngquant"),
    optipng = require("imagemin-optipng"),
    fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

gulp.task("image-min", function () {
    var globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));
    if (globalVar.hasOwnProperty("imageCompression") && !globalVar.imageCompression) {
        return gulp.src(globalVar.editFolder + "/images/**/*.{png,jpg,jpeg,gif,svg}")
            .pipe(gulp.dest(globalVar.distFolder + "/images"));
    } else {
        return gulp.src(globalVar.editFolder + "/images/**/*.{png,jpg,jpeg,gif,svg}")
            .pipe(optipng({ optimizationLevel: 3 })())
            .pipe(pngquant({ quality: "65-80", speed: 4 })())
            .pipe(imageminMozjpeg({ quality: 70 })())
            .pipe(gulp.dest(globalVar.distFolder + "/images"));
    }
});
