# Bootstrap

Bootstrap uses one style file, and one javascript file, with jquery as dependency. We're using a SASS-friendly version of Bootstrap.

Bootstrap is installed by default.

## Uninstall Bootstrap

1. go to your base project folder on terminal
1. Uninstall bootstrap via bower: `bower uninstall bootstrap-sass --save`
1. Open `app/sass/style.scss` and under `framework variables`, remove `@import "./bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss";`
1. Open `gulpfile.js` and on `var jsList`, remove `'./bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',` from it.

## Install Bootstrap

1. go to your base project folder on terminal
1. Install bootstrap via bower: `bower install bootstrap-sass --save`
1. Open `app/sass/style.scss` and under `framework variables`, add `@import "./bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss";`
1. Open `gulpfile.js` and on `var jsList`, ensure jQuery is listed and add `'./bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',` to it.