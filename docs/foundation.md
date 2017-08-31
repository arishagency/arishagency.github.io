# Foundation

To install Foundation, you need to first uninstall Bootstrap.

## Uninstall Bootstrap

1. Make sure `gulp` is not running
1. Go to your project folder on terminal
1. Uninstall via bower: `bower uninstall bootstrap-sass --save`
1. Open `app/sass/style.scss` and under `framework variables`, remove `@import "./bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss";`
1. Open `site.json` and on `concatJs`, remove `"./bower_components/bootstrap-sass/assets/javascripts/bootstrap.js",` from it
1. Run `gulp`

## Install Foundation

1. Make sure `gulp` is not running
1. Go to your project folder on terminal
1. Install via bower: `bower install foundation-sites --save`
1. Open `app/sass/style.scss` and under `framework variables`, add `@import "./bower_components/foundation-sites/assets/foundation.scss";`
1. Open `site.json` and on `concatJs`, ensure jQuery is listed and add `"./bower_components/foundation-sites/dist/js/foundation.js",` to it
1. Run `gulp`