/* eslint-disable no-console */
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  chainWebpack: config => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .loader("ts-loader")
      .tap(opts => {
        opts.transpileOnly = false;
        opts.happyPackMode = false;
        return opts;
      });
  },
  configureWebpack: config => {
    if (process.env.BUNDLE_ANALYZER) {
      config.plugins.push(
        new WebpackBundleAnalyzer({
          analyzerMode: "static",
          analyzerHost: "localhost",
          analyzerPort: 3080
        })
      );
    }
    config.externals = ['@vue/composition-api', 'vue']
    config.module.rules.forEach(v => {
      if (v.use) {
        let idx = v.use.findIndex(w => w.loader === "thread-loader");
        if (idx !== -1) v.use.splice(idx, 1);
      }
    });
  }
};
