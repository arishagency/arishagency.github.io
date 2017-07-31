# Editing

## Important Folders

|Path|Description|
|---|---|
| `edit/content` | the content folder for the markdown files including some sample ones |
| `edit/images` | images to be compressed and converted |
| `edit/sass` | where your sass files go: default is `style.scss` |
| `edit/templates` | a set of Handlebar templates for creating pages and posts |

## Pages and posts

Pages and posts must created in either `edit/content/pages` or `edit/content/posts` folders.

Pages and posts are Markdown files with a YAML front-matter block. The front matter must be the first thing in the file and must take the form of valid YAML set between triple-dashed lines. Here is a basic example:

    ---
    title: Home
    template: index.hbs
    ---

    The rest of the template goes here as markdown text.

Between these triple-dashed lines, you can set predefined variables (see below). These variables will then be available to you in any Handlebars templates or includes that the page or post in question relies on.

|Frontmatter|Priority|Description|
|---|---|---|
|title|required|the title of the page or post|
|template|required|the Handlebars template to use to compile the page or post|
|slug|optional|the URL slug which is used as the folder name when the page or post is built|
|date|optional|used for posts and in the format `YYYY-MM-DD`|
|author|optional|used for posts and the author key in the `site.json` file|
|status|optional|set to 'draft' to ignore the page or post when running the generator|

## Managing Assets

Images, javascripts, fonts etc can all be added to the `edit/` folder. You are free to create directories for these and name them accordingly.

Content is created in the `edit/content/pages` or `edit/content/posts`.

The generator is opinionated in that it expects certain files in particular directories.

## Using Partials

1. Write partial as HTML (not markdown) template
1. Save partial on `edit/templates/partials` folder as an `*.hbs` file
1. Call it with `{{> FileName}}` (for instance, a partial named `header.hbs` is called with `{{> header}}`)


## Helpers

Helpers are available to your Handlebar templates and partials, these are:

|Helper|Description|Example|
|---|---|---|
|date|format a date in a particular format (uses Moment)|`{{date format="MMM Do, YYYY"}}`|
|excerpt|returns an excerpt of the text of your content, use 'words' or 'characters' to set the length|`{{excerpt words="50"}}`|
|content|returns an excerpt of content and is tag aware, use 'words' or 'characters' to set the length|`{{content words="50"}}`|
|resolve|resolves the path to an asset relative to the site root|`{{resolve "/favicon.ico"}}`|