
"use strict";

var gulp = require("gulp"),
    runSequence = require("run-sequence");

gulp.task("default", ["clean"], function(done) {
    process.env.GSD_PUBLISHED = "true";
    runSequence(["build", "develop"], done);
});
