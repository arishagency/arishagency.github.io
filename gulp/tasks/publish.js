var gulp = require("gulp"),
runSequence = require("run-sequence"),
ghPages = require("gulp-gh-pages")
    fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

// moves dist to gh-pages

gulp.task("publish", function() {
  return gulp.src(globalVar.distFolder + "/**/*")
  .pipe(ghPages({branch: globalVar.ghPagesBranch, remoteUrl: globalVar.ghPagesRemoteUrl}));
});
