---
title:       Configuring your Project
slug:        configuration
template:    post.hbs
date:        2017-07-21
author:      nicholas
---
## Main Variables

The metadata file `site.json` contains all configuration required by your site. The following properties are used by the generator.
You are free to add properties to this file for use in your Handlebars templates.

|Value|Type|Priority|Description|
|---|---|---|---|
| title | string | required | the title of your site |
| description | string | required | a description of your site |
| url | string | required | the URL of your site |
| rss | string | required | the RSS feed XML file |
| maxItems | number | optional | the number to use for pagination |
| editFolder | string | required | folder where editable files reside (defaults to `./edit`) |
| distFolder | string | required | folder where publishable files reside (defaults to `./dist`) |
| authors | object | optional | an map of authors with metadata |
| concatJs | array | optional | a list of javascript files to combine and minify |
| styleSheet | string | optional | the name of your main CSS file created by the sass task |
| imageCompression | boolean | optional | a boolean value to enable/disable image compresssion on build |
| uncssIgnore | array | optional | a list of selectors that uncss should ignore (for example ".container" or "#my-element") |