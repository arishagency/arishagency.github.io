# Font Awesome

## Install

1. go to your base project folder on terminal
1. Install bootstrap via bower: `bower install font-awesome --save`
1. Open `app/sass/style.scss` and under `framework variables`, add `@import "./bower_components/font-awesome/scss/font-awesome.scss";`
1. Copy all font files from `./bower_components/font-awesome/fonts` to `./edit/fonts`
1. Anywhere on your SCSS *after* `mixins` import, add `@include font-face(fontawesome-webfont);` to activate it

## Syntax

```
<i class="fa fa-envelope"></i>
```
Check [Font-Awesome Icon List](http://fontawesome.io/icons/) for all options.