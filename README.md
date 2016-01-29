# Universal library generator

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

A simple [Yeoman](http://yeoman.io/) generator to create **ES6 universal** (*UMD*) libraries.<br />
Inspired from [**Generator-babel-boilerplate**](https://github.com/babel/generator-babel-boilerplate) but with Webpack instead of Gulp to make it fast.

![Preview](/preview.png?raw=true)

## Features

- [**Webpack**](https://webpack.github.io/) as module bundler
- Lint with [**ESLint**](http://eslint.org/)
- Compiles from *ES6* to *ES5* with [**Babel 6**](http://babeljs.io/)
- **Development** and **production** (with **UglifyJS** plugin) builds
- Easily configurable in a `package.json` field

## Installation

First, install [**Yeoman**](http://yeoman.io) and this generator as below :

```bash
npm i -g yo generator-universal-library
```

Then generate your new project in a new folder :

```bash
mkdir my-library && cd $_
yo universal-library
```

## Usage

When you launch the generator, Yeoman will ask you a **bunch of questions**, create some **code boilerplate** and install NPM **dependencies**.

Then, you can write your library code in `src` folder. An empty file is present as a default entry file.
> **Note :** The default entry file name depend on what you entered for the repository name.<br />
 It can be easily changed in `package.json` file in `library.entry` field.

Next, choose **production** or **development** environment for the build :

> **Note :** Every time you build, the `lib` folder get deleted.

### Production

Run `npm run build` to compile and minify the code.

### Development

Run `npm start` or `npm run dev`, **Webpack** watch and rebuild the code every time a modification is made.

Then, compiled code will be available in `lib` folder.

## NPM Scripts

- `npm start` or `npm run dev` - Build the library in development mode (watch and rebuilding on fly).
- `npm build` - Build the library in production mode (with **UglifyJS**).
- `npm lint` - Lint the source code.

## FAQ

#### How can I customize entry/output file name ?

You can configure default values in `package.json` file :

```json
"library": {
  "name": "my-library",
  "entry": "my-library.js"
}
```

## License

MIT © [Fabien Motte](http://www.fabienmotte.com/)

[npm-image]: https://badge.fury.io/js/generator-universal-library.svg
[npm-url]: https://npmjs.org/package/generator-universal-library
[travis-image]: https://travis-ci.org/FabienMotte/generator-universal-library.svg?branch=master
[travis-url]: https://travis-ci.org/FabienMotte/generator-universal-library
[daviddm-image]: https://david-dm.org/FabienMotte/generator-universal-library.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/FabienMotte/generator-universal-library