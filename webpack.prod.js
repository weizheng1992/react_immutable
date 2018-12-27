const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: 'source-map',
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production"
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g
    }),
  ]
});
