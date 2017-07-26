"use strict";

var gulp = require("gulp");

gulp.task("build", ["sass", "concat-js", "image-min", "copy-assets", "minify-html"]);
