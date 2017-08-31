# Modernizr and Detectizr

Modernizr and Detectizr reveal browser and system capabilities, adding respective classes to `html` tag, for easy debugging. Check [CSS Browser Debugging](http://www.nonlinear.nyc/css-browser-debugging/) article for what else to do with it.

## Install Modernizr

1. Make sure `gulp` is not running
1. Go to your project folder on terminal
1. Install via bower: `bower install modernizr --save`
1. Open `site.json` and on `concatJs`, ensure jQuery is listed and add `"./bower_components/modernizr/src/Modernizr.js",` to it
1. Run `gulp`

## Install Detectizr

1. Make sure `gulp` is not running
1. Go to your project folder on terminal
1. Install via bower: `bower install detectizr --save`
1. Open `site.json` and on `concatJs`, ensure jQuery is listed and add `"./bower_components/detectizr/src/detectizr.js",` to it
1. Run `gulp`


