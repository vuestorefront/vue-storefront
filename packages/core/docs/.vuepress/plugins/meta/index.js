const { resolve } = require('path');
const { readFileSync, existsSync, mkdirSync } = require('fs');
const nodeHtmlToImage = require('node-html-to-image');

/**
 * Name of the fallback image, when title is not available
 */
const FALLBACK_PATH = 'fallback.jpg';

/**
 * Vue Storefront logo buffer
 */
const VSF_LOGO_BUFFER = new Buffer
  .from(readFileSync(resolve(__dirname,'./logo-horizontal.png')))
  .toString('base64');

 /**
  * Helper function to fill PAGES array
  */
const pageToContent = ({ outDir, title, fileName }) => {
  return {
    title,
    image: `data:image/jpeg;base64,${ VSF_LOGO_BUFFER }`,
    output: resolve(outDir, fileName),
    type: 'jpeg',
    selector: '.banner'
  };
};

module.exports = (options, context) => {
  if (!context.isProd) {
    return;
  }

  return {
    name: 'vue-storefront-meta',
  
    async generated() {
      const outDir = resolve(context.outDir, './og-images');

      const fallback = pageToContent({
        title: 'Vue Storefront documentation',
        fileName: FALLBACK_PATH
      });

      const pages = context.pages
        .filter(({ title }) => Boolean(title))
        .map(page => {

          console.log(page.title)

          return pageToContent({
            outDir,
            title: page.title,
            fileName: page.key
          });
        });
  
      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true });
      }
  
      await nodeHtmlToImage({
        html: readFileSync(resolve(__dirname, './template.html'), 'utf8'),
        content: pages.concat(fallback)
      });
    },
  
    async extendPageData({ key, frontmatter }) {
      frontmatter.meta = [
        {
          property: 'og:image',
          content: `${ context.base }og-images/${ key }.jpg`
        }
      ];
    }
  }
};
