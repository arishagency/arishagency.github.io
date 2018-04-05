
"use strict";

var gulp = require("gulp"),
    sassdoc = require("sassdoc"),
    fs = require("fs"),
    customPlumber = require("../lib/plumber"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

gulp.task("sassdoc", function () {
  var options = {
    dest: globalVar.distFolder + "/styleguide",
    verbose: true,
    display: {
      access: ["public", "private"],
      alias: true,
      watermark: true,
    },
    groups: {
      "undefined": "Ungrouped",
      foo: "Foo group",
      bar: "Bar group",
    },
    basePath: "https://github.com/SassDoc/sassdoc",
  };

  return gulp.src(globalVar.editFolder + "/sass/**/*.scss")
    .pipe(sassdoc(options));
});