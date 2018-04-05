# Publishing

Github let you publish your flat site (html, css, js) via a special branch called `gh-pages`, `lazy-8/base` automates the process further with `gulp publish`. It creates and pushes whatever is on `./dist` folder to `gh-pages` seamlessly.

1. go to your project folder on terminal
1. type `gulp publish`
1. Your project can now be seen at `YourUsername.github.io/YourRepo/`

## Troubleshooting

If `gulp publish` gives you any trouble, simply delete `.publish` folder and try again.

If you want to connect your publishing folder to a domain, refer to `docs/domain.md`

