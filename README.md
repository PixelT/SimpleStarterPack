# SSP » Simple Starter Pack
Simple HTML5 + (S)CSS + TypeScript starter pack (boilerplate) with pre-configured usefull tools & libraries:
- Live reload & sync (using [Browsersync](https://browsersync.io/))
- SCSS compile with autoprefixer, sourcemaps and minification
- TypeScript compile (using [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/)) with sourcemaps and minification
- JPG / PNG / GIF images optimization (with imagemin)
- SVG optimization (with SVGO)
- Predefined tasks for VSCode editor
- Included Sass libraries:
    - [normalize.css](https://necolas.github.io/normalize.css/) - A modern, HTML5-ready alternative to CSS resets
    - [include-media](https://github.com/eduardoboucas/include-media/) - Simple, elegant and maintainable media queries in Sass
    - [mdcolorize](https://github.com/PixelT/mdcolorize) - Simple Sass (SCSS) function for fast usage material design colors
- Configured packages:
    - [JSDOM](https://quokkajs.com/docs/configuration.html#jsdom) for [Quokka.js](https://quokkajs.com/) tool

## Installation & Usage
- npm: `npm install simple-starter-pack`
- yarn: `yarn add simple-starter-pack`

or
```sh
git clone https://github.com/PixelT/SimpleStarterPack.git path/to/your/project
cd path/to/your/project
yarn install
```
## Gulp tasks
- `gulp` or `gulp build` - it compiles & minifies SCSS and TypeScript, sourcemaps are disabled.
- `gulp dev` - it runs Browsersync in developer mode, with sourcemaps enabled.

## Static vs Dynamic sites
By default, SSP are using `html` file(s) and run in `server` mode - no action is needed here.
If you have already running local PHP server (MAMP / XAMP / WAMP etc.) you can use `dynamic` mode - change index.html to index.php and run `gulp dev` task with `--proxy` argument (see below)

## Pass custom settings
It's possible to pass to Browsersync custom settings, by adding additional arguments into `gulp dev` task:
- `--proxy` or `--proxy="your_proxy_address"` - custom proxy URL address (default is `<your_folder_name>.test`)
- `--port="your_port"` - custom port for `proxy` (default is `3000`)