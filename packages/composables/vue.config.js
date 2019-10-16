const WebpackBundleAnalyzer = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: config => {
    config.plugins.push(
      new WebpackBundleAnalyzer({
        analyzerMode: 'static',
        analyzerHost: "localhost",
        analyzerPort: 3080
      })
    );
  }
};
