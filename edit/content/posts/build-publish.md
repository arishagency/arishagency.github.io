---
title:       Building and Publishing the Site on GitHub
slug:        build-publish
template:    post.hbs
date:        2017-08-01
author:      nicholas
---

## Setting up your project

Suppose your GitHub user name is `myUserName` and you name your new webproject as `myProject`.  Then the workflow starts with the following:

1. create a GitHub repository and name it depending on *how* you want to host the site on GitHub:
    1. if you want a [project site](https://help.github.com/articles/user-organization-and-project-pages/#project-pages) call the repo `myProject`, so the URL of the repository will be `https://github.com/myUserName/myProject.git`
    1. if you want a [user site](https://help.github.com/articles/user-organization-and-project-pages/#user--organization-pages) call the repo `myUserName.github.io`, so the URL of the repository will be `https://github.com/myUserName/myUserName.git`
1. clone `base` into `myProject` and `cd` to it
```
git clone https://github.com/lazy-8/base.git myProject; cd myProject
```
1. configure git to push to your repo
```
git remote set-url origin https://github.com/myUserName/myProject.git
```
1. set the `ghPagesBranch` and `ghPagesRemoteUrl` variables in `site.json`
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

## Building and publishing the site

Before getting ready to publish your site you probably were running the default gulp task via `gulp`, which not only watched the changes you made in the `edit/` directory but was also running a local webserver to give you immediate feedback on the changes.  In the meantime you probably also pushed your locally committed changes to your GitHub repo regularly.

Once you are ready to publish your site on GitHub
```
# ensure that gulp is not already running
gulp clean
gulp build
gulp publish
```

The URL of the published site again depends on the type of GitHub hosting
1. for a *project site* it's https://myUserName.github.io/myProject/github/
1. for a *user site* it's https://myUserName.github.io/myProject/
