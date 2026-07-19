import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HTMLPlugin from 'html-webpack-plugin'
import base from './webpack.base.config'
import themeRoot from './theme-path'
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin'

const themedIndex = path.join(themeRoot, '/templates/index.template.html')
const themedIndexMinimal = path.join(themeRoot, '/templates/index.minimal.template.html')
const themedIndexBasic = path.join(themeRoot, '/templates/index.basic.template.html')
const themedIndexAmp = path.join(themeRoot, '/templates/index.amp.template.html')
const isProd = process.env.NODE_ENV === 'production'

const config = merge(base, {
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          // create 'vendor' group from initial packages from node_modules
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          priority: 1
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  mode: 'development',
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  plugins: [
    // generate output HTML
    new HTMLPlugin({
      template: fs.existsSync(themedIndex) ? themedIndex : 'src/index.template.html',
      filename: 'index.html',
      chunksSortMode: 'none',
      inject: isProd === false // in dev mode we're not using clientManifest therefore renderScripts() is returning empty string and we need to inject scripts using HTMLPlugin
    }),
    new HTMLPlugin({
      template: fs.existsSync(themedIndexMinimal) ? themedIndexMinimal : 'src/index.minimal.template.html',
      filename: 'index.minimal.html',
      chunksSortMode: 'none',
      inject: isProd === false
    }),
    new HTMLPlugin({
      template: fs.existsSync(themedIndexBasic) ? themedIndexBasic : 'src/index.basic.template.html',
      filename: 'index.basic.html',
      chunksSortMode: 'none',
      inject: isProd === false
    }),
    new HTMLPlugin({
      template: fs.existsSync(themedIndexAmp) ? themedIndexAmp : 'src/index.amp.template.html',
      filename: 'index.amp.html',
      chunksSortMode: 'none',
      inject: isProd === false
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        extensions: {
          vue: true
        }
      }
    }),
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin()
  ]
})

export default config;
