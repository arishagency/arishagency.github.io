---
title:       Building the Site and Publishing on GitHub
slug:        build-publish
template:    post.hbs
date:        2017-08-20
author:      nicholas
---

## Git repositories

Suppose that your GitHub user name is `myUserName`, that you want to name your new website project as `myProject` and to publish the site using the [GitHub Pages](https://pages.github.com/) free web hosting service.  You have the choice to publish your site
* either as a [project site](https://help.github.com/articles/user-organization-and-project-pages/#project-pages)
* or as a [user site](https://help.github.com/articles/user-organization-and-project-pages/#user--organization-pages)

Note that only one *user site* is allowed for each GitHub account but multiple *project sites* are possible.

For both options (*project* or *user site*) you will need the first two of these three git repositories; for a *user site* you'll also need the third:
1. a local repository called `myProject` cloned from https://github.com/lazy-8/base.git
1. a GitHub repository called `myProject` (GitHub will assign it the URL https://github.com/myUserName/myProject.git)
1. a GitHub repository called `myUserName.github.io` (the assigned URL will be https://github.com/myUserName/myUserName.git)

The local `myProject` repository will track changes you made to your source files (content, templates, stylesheets, javascript,...) and will push these to the *master* branch of the remote `myProject` on GitHub.  Note that although the *master* branch of the remote `myProject` is on GitHub it will *not* be used by GitHub Pages.  Instead, it will serve as a backup and a central repository for possible collaboration with other GitHub users.

What *will* be used by GitHub Pages is the *gh-pages* branch of the remote `myProject`, which will contain the built site.  At least when you are publishing a *project site*.  For a *user site* the built site will be pushed to the *master* branch of the third repository listed above, the remote `myUserName.github.io`.

## Workflow

### Setting up repositories, configuration

1. create a `myProject` repository on GitHub
1. optionally (for a *project site*) create also `myUserName.github.io` on GitHub
1. clone `base` into the local `myProject` and `cd` to it
```
git clone https://github.com/lazy-8/base.git myProject; cd myProject
```
1. configure git to push the changes committed in the local `myProject` to the remote `myProject`
```
git remote set-url origin https://github.com/myUserName/myProject.git
```
1. set the `ghPagesBranch` and `ghPagesRemoteUrl` variables in `site.json`; this will tell the `gulp publish` task where you'd like to deploy the built site
    1. for a *project site*
```
...
"ghPagesBranch": "gh-pages",
"ghPagesRemoteUrl": "https://github.com/myUserName/myProject.git"}
```
    1. for a *user site*
```
...
"ghPagesBranch": "master",
"ghPagesRemoteUrl": "https://github.com/myUserName/myUserName.git"}
```
1. set other variables in `site.json` like `title`, `description`, etc
1. install `node.js` packages
```
npm install; bower install
```

### Building and publishing the site

Before getting ready to publish your site you probably were running the default gulp task via `gulp`, which not only watched the changes you made in the `edit/` directory but was also running a local webserver to give you immediate feedback on the changes.  In the meantime you probably also pushed your locally committed changes to the remote `myProject` GitHub repository regularly.

Once you are ready to publish your site on GitHub
```
# ensure that gulp is not already running
gulp clean
gulp build
gulp publish
```

The URL of the published site again depends on the type of GitHub hosting
* for a *project site* it's https://myUserName.github.io/myProject/github/
* for a *user site* it's https://myUserName.github.io/myProject/
