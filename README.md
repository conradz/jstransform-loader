# jstransform-loader

[![Build Status](https://travis-ci.org/conradz/jstransform-loader.svg?branch=master)](https://travis-ci.org/conradz/jstransform-loader)

A [webpack](http://webpack.github.io/) loader for [jstransform](https://github.com/facebook/jstransform).

This loader runs the source code through JSTransform, which can be used to transform ES6 code to ES5, or any other transforms to the JS source code.

## Installation

```sh
npm install --save jstransform-loader
```

To use the JSTransform default visitors:

```sh
npm install --save jstransform-loader jstransform
```

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

By default it will use the visitors built-in to JSTransform. You can specify a list of visitors that will be used by providing a comma-separated list in the loader query.

```js
var foo = require('jstransform-loader!./foo');
// runs jstransform with the built-in jstransform visitors for es6 and imports
// it

var bar = require('jstransform-loader?./my-transform,other-transform!./bar');
// runs jstransform with the ./my-transform and ./other-transform visitors on
// the ./bar.js file and imports it
```

## Example config

To run JSTransform on all your JS files, you can use the `postLoader` configuration option.

```js
module.exports = {
    module: {
        postLoaders: [{ loader: 'jstransform-loader' }]
        // or specify list of visitors:
        // postLoaders: [{ loader: 'jstransform-loader?my-transforms' }]
    }
};
```
