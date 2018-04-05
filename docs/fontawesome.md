# Font Awesome

## Install

1. Make sure `gulp` is not running
1. go to your project folder on terminal
1. Install via bower: `bower install font-awesome --save`
1. Open `app/sass/style.scss` and under `framework variables`, add `@import "./bower_components/font-awesome/scss/font-awesome.scss";`
1. Copy all font files from `./bower_components/font-awesome/fonts` to `./edit/fonts`
1. Anywhere on your SCSS *after* `mixins` import, add `@include font-face(fontawesome-webfont);` to activate it

## Example of Use (html)

```
<i class="fa fa-envelope"></i>
```
Check [Font-Awesome Icon List](http://fontawesome.io/icons/) for all options.