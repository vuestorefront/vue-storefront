const { resolve } = require('path');
const { readFileSync, existsSync, mkdirSync } = require('fs');
const nodeHtmlToImage = require('node-html-to-image');

/**
 * Name of the fallback image, when title is not available
 */
const FALLBACK_PATH = 'fallback.jpg';

 /**
  * Helper function to fill PAGES array
  */
function pageToContent({ outDir, title, fileName }) {
  return {
    title,
    output: resolve(outDir, fileName),
    type: 'jpeg',
    selector: '.banner'
  };
}

module.exports = (options, context) => {
  if (!context.isProd) {
    return;
  }

  return {
    name: 'vue-storefront-meta',
  
    async generated() {
      const outDir = resolve(context.outDir, './og-images');

      const fallback = pageToContent({
        outDir,
        title: 'Vue Storefront documentation',
        fileName: FALLBACK_PATH
      });

      const pages = context.pages
        .filter(({ title }) => Boolean(title))
        .map(page => pageToContent({
          outDir,
          title: page.title,
          fileName: `${ page.key }.jpg`
        }))
        .concat(fallback);

      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true });
      }

      await nodeHtmlToImage({
        html: readFileSync(resolve(__dirname, './template.html'), 'utf8'),
        content: pages,
        puppeteerArgs: {
          args: [
            '--autoplay-policy=user-gesture-required',
            '--disable-background-networking',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-breakpad',
            '--disable-client-side-phishing-detection',
            '--disable-component-update',
            '--disable-default-apps',
            '--disable-dev-shm-usage',
            '--disable-domain-reliability',
            '--disable-extensions',
            '--disable-features=AudioServiceOutOfProcess',
            '--disable-hang-monitor',
            '--disable-ipc-flooding-protection',
            '--disable-notifications',
            '--disable-offer-store-unmasked-wallet-cards',
            '--disable-popup-blocking',
            '--disable-print-preview',
            '--disable-prompt-on-repost',
            '--disable-renderer-backgrounding',
            '--disable-setuid-sandbox',
            '--disable-speech-api',
            '--disable-sync',
            '--hide-scrollbars',
            '--ignore-gpu-blacklist',
            '--metrics-recording-only',
            '--mute-audio',
            '--no-default-browser-check',
            '--no-first-run',
            '--no-pings',
            '--no-sandbox',
            '--no-zygote',
            '--password-store=basic',
            '--use-gl=swiftshader',
            '--use-mock-keychain',
          ]
        }
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
