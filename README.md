# Static site generator using Gulp

- Converts [Markdown](https://daringfireball.net/projects/markdown/syntax) files to static HTML
- [Handlebars](http://handlebarsjs.com) templates and partials
- Sass compiling and minification
- Css reducing (Uncss)
- Javascript concatenating and minification
- Asset copying
- Image compression
- HTML compression
- RSS feed creation
- Runs a local server that reloads with changes
- Draft content
- Creates a distribution folder with all content and assets
- publishes distribution folder on gh-pages for quick deploy


## Installation

Go to the folder you'll add your new project on terminal and

```
npm install -g gulp
git clone https://github.com/lazy-8/base.git ProjectName
cd ProjectName
node install
npm install
bower install
gulp
```

## Critical Files and Folders

* `package.json` - the node modules required by the generator
* `gulpfile.js` - the gulp file for all the generator tasks
* `site.json` - the metadata for your site
* `edit/content` - the content folder for the markdown files including some sample ones
* `edit/images` - a sample image
* `edit/sass` - a sample sass file
* `edit/templates` - a set of Handlebar templates for creating pages and posts

## Configuration

The metadata file `site.json` contains all configuration required by your site. The following properties are used by the generator.
You are free to add properties to this file for use in your Handlebars templates.

* title (string) (required) - the title of your site
* description (string) (required) - a description of your site
* url (string) (required) - the URL of your site
* rss (string) (required) - the RSS feed XML file
* maxItems (number) (optional) - the number to use for pagination
* authors (object) (optional) - an map of authors with metadata
* concatJs (array) (optional) - a list of javascript files to combine and minify
* styleSheet (string) (optional) - the name of your main CSS file created by the sass task
* imageCompression (boolean) (optional) - a boolean value to enable/disable image compresssion on build
* uncssIgnore (array) (optional) - a list of selectors that uncss should ignore (for example ".container" or "#my-element")

## Content

Content must be added to the `edit/content` directory.

## Pages and posts

Pages and posts must created in the `edit/content/pages` and `edit/content/posts` directories.

Pages and posts are Markdown files with a YAML front-matter block. The front matter must be the first thing in the file and must take the form of valid YAML set between triple-dashed lines. Here is a basic example:

    ---
    title: Home
    template: index.hbs
    ---

    The rest of the template goes here as markdown text.

Between these triple-dashed lines, you can set predefined variables (see below). These variables will then be available to you in any Handlebars templates or includes that the page or post in question relies on.

* title (required) - the title of the page or post
* template (required) - the Handlebars template to use to compile the page or post
* slug (optional) - the URL slug which is used as the directory name when the page or post is built
* date (optional) - used for posts and in the format YYYY-MM-DD
* author (optional) - used for posts and the author key in the `site.json` file
* status (optional) - set to 'draft' to ignore the page or post when running the generator

## Assets

Images, javascripts, fonts etc can all be added to the `edit/` directory. You are free to create directories for these and name them accordingly.

Content is created in the `edit/content/pages` or `edit/content/posts`.

The generator is opinionated in that it expects certain files in particular directories.
To help with this, [an example site](https://github.com/ducksoupdev/gulp-site-generator-example) is available that shows you how to structure your site with the generator.

## Templates

Handlebars is used for rendering templates. Partials located in `edit/templates/partials` are automatically available to your Handlebar templates.

Helpers are available to your Handlebar templates and partials, these are:

* date - format a date in a particular format (uses Moment)

    `{{date format="MMM Do, YYYY"}}`

* excerpt - returns an excerpt of the text of your content, use 'words' or 'characters' to set the length

    `{{excerpt words="50"}}`

* content - returns an excerpt of content and is tag aware, use 'words' or 'characters' to set the length

    `{{content words="50"}}`

* resolve - resolves the path to an asset relative to the site root

    `{{resolve "/favicon.ico"}}`

## Soon

- [ ] how to detach project from `base` on github, gulp publish (configuration?)
- [ ] discuss uncss and how to handle it
- [ ] KSS styleguide
- [ ] how to change `dist` and `edit` names
- [ ] error handling
- [ ] redo README, smaller
- [ ] link to `docs/`, list other tutorials we should add
- [ ] finetune `gulp clean` (now it simply deletes folder, but it should be more granular than that)