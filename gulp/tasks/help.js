"use strict";

var gulp = require("gulp");

gulp.task("help", function () {
    console.log("Static site generator using Gulp\n");
    console.log("Tasks available:");
    console.log("- gulp");
    console.log("- gulp clobber");
    console.log("- gulp image-min");
    console.log("- gulp sass");
    console.log("- gulp help");
    console.log("- gulp publish");
});
