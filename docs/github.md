# Github

## Version Control

In order to version control your repository, you need to first create a new repository and then point your local version to it.

(this tutorial assumes you have your github credentials on this machine)

1. [Create a new repository](https://github.com/new) on github
1. Copy the `HTTPS` path (it should be `https://github.com/YourUsername/YourRepo.git`)
1. Navigate to your project folder
1. type `git remote set-url origin PASTEHERE` and enter
1. Your project will push to your repo now

## Publishing

Github has a cool feature that publishes your site quick and easy, when you push to a `gh-pages` branch.

We automated the process a lil further with `gulp publish`. It creates and pushes whatever is on `./dist` folder to `gh-pages` seamlessly. Your project can now be seen at `YourUsername.github.io/YourRepo/`

## Domains

    How to use github with domains... since it transforms `./dist` to root, we need to update `clean.js` first