// const path = require('path')

const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.config");

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devServer: {
    port: 8081,
    liveReload: true,
    watchFiles: ["src/**/*"],
    client: {
      reconnect: true,
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
