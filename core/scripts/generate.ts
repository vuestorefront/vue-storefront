import generator from './utils/page-generator'
import { path as rootPath } from 'app-root-path'
import * as path from 'path'
import * as ssr from './utils/ssr-renderer'
import config from 'config'
import themeRoot from '../build/theme-path'
import { search } from './utils/catalog-client'
import bodybuilder from 'bodybuilder'
import program from 'commander'
const resolve = file => path.resolve(rootPath, file)

// eslint-disable-next-line @typescript-eslint/no-use-before-define
const { renderer, templatesCache, destPath } = _prepareRenderer();

async function _renderItems (itemsSource, pageFrom, pageSize, useRelativePaths = false, urlToFileNameMapper = (destPath, item) => {
  return (path.join(destPath, item._source.url_path))
}) {
  let recordsProcessed = 0
  let results = null
  do {
    results = await itemsSource(pageFrom, pageSize)
    console.log(`Processing records - pageSize: ${pageSize} from: ${pageFrom}`)
    if (results.hits && results.hits.hits.length > 0) {
      results.hits.hits.forEach(async item => {
        console.log(`Generating static page for ${item._source.url_path} - ${item._source.name}`)
        const urlToRender = item._source.url_path
        const res = { redirect: (url) => {} }
        const req = { url: urlToRender }
        const context = ssr.initSSRRequestContext(null, req, res, config)
        try {
          let output = await renderer.renderToString(context)
          const outputFilename = urlToFileNameMapper(destPath, item)
          output = ssr.applyAdvancedOutputProcessing(context, output, templatesCache, true, useRelativePaths, destPath, outputFilename);
          generator.saveRenderedPage(outputFilename, output)
        } catch (err) {
          console.error(`Error rendering item: ${item._source.name}: ${err}`)
        }
      });
      recordsProcessed += results.hits.hits.length
    } else {
      console.log(`Done! Total number of items processed: ${recordsProcessed}`)
    }
    pageFrom = pageFrom + pageSize
  } while (results.hits && results.hits.hits.length > 0)
}

// TODO: all, prepare, clear commands + relative paths as an option
const _cmdGenerateProducts = async (cmd) => {
  const getProductsPage = (from, size) => search({
    size: size,
    from: from,
    sort: 'id:desc',
    type: 'product',
    searchQuery: bodybuilder().filter('terms', 'visibility', [2, 3, 4]).andFilter('term', 'status', 1).build()
  }, config, config /* TODO: add support for different storeviews */)
  let pageFrom = parseInt(cmd.from)
  let pageSize = parseInt(cmd.size)

  await _renderItems(getProductsPage, pageFrom, pageSize, cmd.relative)
}
program
  .command('products')
  .option('-r|--relative <relative>', 'use relative paths', false)
  .option('-f|--from <from>', 'from - starting record', 0)
  .option('-s|--size <size>', 'size - batch size', 20)
  .action(_cmdGenerateProducts)

const _cmdGenerateCategories = async (cmd) => {
  const getCategoriesPage = (from, size) => search({
    size: size,
    from: from,
    sort: 'id:desc',
    type: 'category',
    searchQuery: bodybuilder().filter('term', 'is_active', true).build()
  }, config, config /* TODO: add support for different storeviews */)
  let pageFrom = parseInt(cmd.from)
  let pageSize = parseInt(cmd.size)

  await _renderItems(getCategoriesPage, pageFrom, pageSize, cmd.relative, (destPath, item) => {
    return (path.join(destPath, `${item._source.url_path}/index.html`))
  })
}
program
  .command('categories')
  .option('-r|--relative <relative>', 'use relative paths', false)
  .option('-f|--from <from>', 'from - starting record', 0)
  .option('-s|--size <size>', 'size - batch size', 20)
  .action(_cmdGenerateCategories)

const _cmdGenerateCms = async (cmd) => {
  const getCmsPage = (from, size) => search({
    size: size,
    from: from,
    sort: 'id:desc',
    type: 'cms_page',
    searchQuery: bodybuilder().build()
  }, config, config /* TODO: add support for different storeviews */).then(results => {
    if (results.hits && results.hits.hits.length > 0) {
      results.hits.hits.map(page => { page._source.url_path = `/i/${page._source.identifier}` })
    }
    return results
  })
  let pageFrom = parseInt(cmd.from)
  let pageSize = parseInt(cmd.size)

  await _renderItems(getCmsPage, pageFrom, pageSize, cmd.relative)
}
program
  .command('cms')
  .option('-r|--relative <relative>', 'use relative paths', false)
  .option('-f|--from <from>', 'from - starting record', 0)
  .option('-s|--size <size>', 'size - batch size', 20)
  .action(_cmdGenerateCms)

const _cmdPrepare = async (cmd) => {
  await generator.clearAll(destPath);
  await generator.saveScripts(resolve(''), destPath);
  await generator.saveSW(resolve(''), destPath);
  await generator.saveAssets(themeRoot, destPath);
}
program
  .command('prepare')
  .action(_cmdPrepare)

const _cmdAll = async (cmd) => {
  await _cmdPrepare(cmd)
  // render home page
  await _renderItems(async (from, to) => {
    if (from === 0) {
      return {
        hits: {
          hits: [
            {
              _source: {
                name: 'Home page',
                output_file_name: 'index.html',
                url_path: '/' // to render home page
              }
            },
            {
              _source: {
                name: 'Page not found',
                output_file_name: 'page-not-found',
                url_path: '/page-not-found' // to render home page
              }
            }
          ]
        }
      }
    } else {
      return { hits: null }
    }
  }, 0, 50, cmd.relative, (destPath, item) => {
    return path.join(destPath, item._source.output_file_name)
  })
  await _cmdGenerateCategories(cmd)
  await _cmdGenerateProducts(cmd)
  await _cmdGenerateCms(cmd)
}
program
  .command('all')
  .option('-r|--relative <relative>', 'use relative paths', false)
  .option('-f|--from <from>', 'from - starting record', 0)
  .option('-s|--size <size>', 'size - batch size', 20)
  .action(_cmdAll)

function _prepareRenderer () {
  const compileOptions = {
    escape: /{{([^{][\s\S]+?[^}])}}/g,
    interpolate: /{{{([\s\S]+?)}}}/g
  };
  const templatesCache = ssr.initTemplatesCache(config, compileOptions);
  // In production: create server renderer using server bundle and index HTML
  // template from real fs.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const clientManifest = require(resolve('dist/vue-ssr-client-manifest.json'));
  const bundle = require(resolve('dist/vue-ssr-bundle.json'));
  // src/index.template.html is processed by html-webpack-plugin to inject
  // build assets and output as dist/index.html.
  // TODO: Add dynamic templates loading from (config based?) list
  const renderer = ssr.createRenderer(bundle, clientManifest);
  const destPath = resolve(config.staticPages.destPath);
  return { renderer, templatesCache, destPath };
}

program.parse(process.argv)
