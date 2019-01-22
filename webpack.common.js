const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const PurifyCssWebpack = require("purifycss-webpack");
const glob = require("glob");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    app: ["@babel/polyfill", "./src/index.js"]
  },
  output: {
    filename: "[name]-[hash].bundle.js",
    chunkFilename: "[name]-[hash]-[id].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        include: [path.resolve(__dirname, "src")],
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[local]_[hash:base64:5]"
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: path.resolve(__dirname, "./src/img/svg"),
        use: {
          loader: "url-loader",
          options: {
            limit: 1024,
            outputPath: "img"
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-proposal-class-properties",
              ["@babel/plugin-proposal-decorators", { legacy: true }]
            ]
          }
        }
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        include: path.resolve(__dirname, "./src/img/svg"), // 只带自己人玩
        options: {
          symbolId: `icons_[name]`
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendor: {
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: 100,
          minSize: 0
        },
        common: {
          chunks: "all",
          test: /[\\/]src[\\/]common[\\/]/,
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          priority: 1
        },
        styles: {
          name: "styles",
          test: /\.(le|c)ss$/,
          chunks: "all",
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[name][id].css" : "[name][id].[hash].css"
    }),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "./dist/index.html"),
      template: path.resolve(__dirname, "./index-tmpl.html"),
      title: "健康物种",
      inject: true,
      showErrors: true,
      favicon: "./logo.png",
      minify:
        process.env.NODE_ENV === "development"
          ? false
          : {
              removeComments: true, //移除HTML中的注释
              collapseWhitespace: true, //折叠空白区域 也就是压缩代码
              removeAttributeQuotes: true //去除属性引用
            }
    }),

    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom",
      Component: ["react", "Component"]
    }),
    new PurifyCssWebpack({
      paths: glob.sync(path.join(__dirname, "src/*.html"))
    }),
    new CopyWebpackPlugin([{ from: "logo.png" }])
  ]
};
