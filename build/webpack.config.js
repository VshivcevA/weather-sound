const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../docs"),
  assets: "assets/",
};
module.exports = {
  target: "web",
  externals: {
    paths: PATHS,
  },
  entry: PATHS.src,
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: "auto",
    clean: true,
  },

  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"],
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.ts$/,
      //   loader: "babel-loader",
      //   exclude: /node_modules/,
      // },
      //ts
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      //img
      {
        test: /\.(jpe?g|png|svg)$/i,
        type: "asset",
        generator: {
          filename: `${PATHS.assets}img/[name][ext]`,
        },
      },
      //scss
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: `build/postcss.config.js`,
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.src}/static`,
          to: "",
        },
        {
          from: `${PATHS.src}/assets/img`,
          to: `${PATHS.assets}/img`,
        },
        {
          from: `${PATHS.src}/assets/sounds`,
          to: `${PATHS.assets}/sounds`,
        },
      ],
    }),

    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      title: "Webpack",
      favicon: `${PATHS.src}/static/favicon.ico`,
      filename: "index.html",
    }),
  ],
};
