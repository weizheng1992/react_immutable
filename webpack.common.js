const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
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
          'css-hot-loader',
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                context: path.resolve(__dirname, 'src'),
              },
              importLoaders: 1,
              localsConvention: 'asIs'
            }
          }, {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          },
          {
            loader: "less-loader",
            // options: {
            //   sourceMap: true
            // }
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
            limit: 1024 * 5,
            outputPath: "img"
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
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
  node: {
    fs: "empty"
  },
  optimization: {
    minimize: devMode ? false : true,
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
          minChunks: 2,
          priority: -10,
          minSize: 0
        },
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          name: 'common'
        },
        default: { // 默认缓存组名
          minChunks: 2, // 最少引用两次才会被拆分
          priority: -20, // 权重 -20
          reuseExistingChunk: true // 如果主入口中引入了两个模块，其中一个正好也引用了后一个，就会直接复用，无需引用两次
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: 4,
        terserOptions: {
          compress: {
            // drop_console: true
          }
        }
      })
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.json', '.css'],//自动解析确定的扩展,省去你引入组件时写后缀的麻烦
    alias: {   //配置一些短路径
      src: path.resolve(__dirname, '../src'),
      components: path.resolve(__dirname, '../src/components'),
      utils: path.resolve(__dirname, '../src/utils'),
    },
    modules: ['node_modules'],//webpack 解析模块时应该搜索的目录
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[name][id].css" : "[name][id].[hash].css"
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "./dist/index.html"),
      template: path.resolve(__dirname, "./index-tmpl.html"),
      title: "饿了么",
      inject: true,
      showErrors: true,
      hash: true,
      favicon: "./logo.png",
      vendor: "./vendor.dll.js",
      minify:
        process.env.NODE_ENV === "development"
          ? false
          : {
            minifyCSS: true,
            minifyJS: true,
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
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, ".", "dist", "manifest.json")
    }),
    new PurifyCssWebpack({
      paths: glob.sync([ // 传入多文件路径
        path.resolve(__dirname, './*.html'), // 处理根目录下的html文件
        path.resolve(__dirname, './src/*.js') // 处理src目录下的js文件
      ])
    }),
    new CleanWebpackPlugin(["dist"], {
      root: path.join(__dirname, "."),
      exclude: ["manifest.json", "vendor.dll.js"],
      verbose: true,
      dry: false
    }),
    new CopyWebpackPlugin([{ from: "logo.png" }])
  ]
};
