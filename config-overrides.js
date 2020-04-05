const {
  override,
  addPostcssPlugins,
} = require("customize-cra");

// PostCss
var autoprefixer = require('autoprefixer');
var postcssVars = require('postcss-simple-vars');
var postcssImport = require('postcss-import');

module.exports = override(
  addPostcssPlugins([postcssImport, postcssVars, autoprefixer]),
);

// module.exports = function override(config, env) {
//   //do stuff with the webpack config...
//   return config;
// }
