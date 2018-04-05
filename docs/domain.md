# Domain

## Preparation

Domains don't point to subfolders, so you need to rename your repository to `username.github.io` so github understands it as root.

Github assumes this repo is for publishing only, so publishing branch is `master`, not `gh-pages`, so you need to move your actual version control **outside** `master`, so let's say we'll move it to `main`...

1. go to your project folder on terminal
1. create a new `main` branch, with `git checkout -b main`
1. push changes to your new branch, to test

You need to point `gulp publish` to push to `master` instead:

1. make sure `gulp` is not running
1. open `site.json` and change `ghPagesBranch` value to `master`
1. run `gulp publish` again

## Connecting Domain with Github

1. make sure `gulp` is not running
1. create a `CNAME` file on your `edit/` folder. Inside it, type the domain you want your github hosting to point to, on first line, save it
1. run `gulp` again. your `CNAME` will be up on next `gulp publish`
2. In your DNS manager, setup two `cname` records. One for the root apex (@) and one for www. Both point to `username.github.io`. If your DNS provider does **NOT** support `ALIAS` records on the root apex (@), simply create `A` records that point to `192.30.252.153` and `192.30.252.154`
3 Wait til your name servers update: `dig yourdomain.com +nostats +nocomments +nocmd`

## Tips and Reference

- [Custom domain for GitHub project pages - Stack Overflow](https://stackoverflow.com/a/9123911/3754357)
- More on [project sites](https://help.github.com/articles/user-organization-and-project-pages/#project-pages)
- More on [user sites](https://help.github.com/articles/user-organization-and-project-pages/#user--organization-pages)
- Since it counts as root, only one *user site* is allowed for each GitHub account, so if you have different projects, consider [creating an organization](https://github.com/organizations/new) per new project