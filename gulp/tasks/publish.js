var gulp = require('gulp'),
ghPages = require('gulp-gh-pages'),
runSequence = require('run-sequence'),
fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

// moves dist to gh-pages

gulp.task('publish', function() {
  return gulp.src(globalVar.distFolder + "/**/*")
  .pipe(ghPages());
});

