"use strict";

var gulp = require("gulp"),
    connect = require("gulp-connect"),
    open = require("gulp-open"),
    gutil = require("gulp-util"),
    fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

gulp.task("livereload-connect", ["build"], function () {
    connect.server({
        root: globalVar.distFolder,
        livereload: true
    });
    gulp.src(__filename).pipe(open({uri: "http://localhost:8080"}));
});

gulp.task("livereload-html", function () {
    gulp.src(globalVar.distFolder)
        .pipe(connect.reload());
});

var _lto = 0;
gulp.task("livereload-watch", function () {
    gulp.watch([globalVar.editFolder + "/sass/**/*.scss"], ["uncss"]);
    gulp.watch([globalVar.editFolder + "/templates/**/*.hbs"], ["minify-html"]);
    gulp.watch([globalVar.editFolder + "/js/**/*.js"], ["concat-js"]);
    gulp.watch([globalVar.editFolder + "/images/**/*.{gif,jpg,png}"], ["image-min"]);
    gulp.watch([globalVar.editFolder + "/content/**/*.md"], ["minify-html"]);
    gulp.watch([globalVar.distFolder + "/**/*.*"]).on("change", function (event) {
        gutil.log(gutil.colors.green("-"),event.path.replace(process.cwd(),""), gutil.colors.magenta(event.type));
        clearTimeout(_lto);
        _lto = setTimeout(function () {
            gulp.start("livereload-html");
        }, 100);
    });
});

gulp.task("develop", ["livereload-connect", "livereload-watch"]);
