const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: 'source-map',
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
      cssProcessorOptions: { 
        discardComments: { removeAll: true } 
      },
      canPrint: true //是否将插件信息打印到控制台
    }),
    new PrerenderSPAPlugin({
      // Required - The path to the webpack-outputted app to prerender.
      staticDir: path.join(__dirname, 'dist'),
      // Required - Routes to render.
      routes: ['/'],
    }),
  ]
});
