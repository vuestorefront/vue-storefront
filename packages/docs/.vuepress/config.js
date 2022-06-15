const { resolve } = require('path');
const { STATUS, LICENSE, CATEGORY, INTEGRATIONS } = require('./integrations');
const GTM_TAG = 'GTM-WMDC3CP';

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Vue Storefront 2',

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: 'Vue Storefront 2 documentation',

  /**
   * Ref: https://v1.vuepress.vuejs.org/config/#base
   */
  base: '/v2/',

  /**
   * Ref: https://vuepress.vuejs.org/config/#shouldprefetch
   */
  shouldPrefetch: () => false,

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],

    // HubSpot
    ['script', { async: true, defer: true, src: 'https://js.hs-scripts.com/8443671.js', id: 'hs-script-loader' }],

    // Google Tag Manager
    ['script', {}, [`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_TAG}');
    `]],
  ],

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#configurewebpack
   */
  configureWebpack: (config) => {
     // Add support for webp images
     config.module.rules.push({
       test: /\.(webp)(\?.*)?$/,
       use: [
         {
           loader: 'url-loader',
           options: {
             limit: 10000,
             name: 'assets/img/[name].[hash:8].[ext]'
          }
         }
       ]
     });

    // Fix image loading. Ref: https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
    config.module.rules = config.module.rules.map((rule) => {
      rule.use = rule.use && rule.use.map((useRule) => {
        if (useRule.loader === 'url-loader') {
          useRule.options.esModule = false;
        }

        return useRule;
      });

      return rule;
    });
  },

  /**
   * Ref：https://v1.vuepress.vuejs.org/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    [
      '@vuepress/plugin-medium-zoom',
      {
        // This selector excludes images from the "Integrations" page
        selector: 'main :not(.tile-image) > img'
      }
    ],
    '@vuepress/active-header-links',
    '@vuepress/search',
    resolve(__dirname, './plugins/meta/index.js')
  ],

  /**
   * Ref: https://v1.vuepress.vuejs.org/config/#markdown
   */
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-video'), {
        youtube: { width: 740, height: 416.25 }, // 16:9 ratio, where 740px is the width of the page content
      });
    }
  },

  /**
   * Ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    GTM_TAG,
    STATUS,
    LICENSE,
    CATEGORY,
    INTEGRATIONS,
    repo: 'https://github.com/vuestorefront/',
    editLinks: true,
    docsRepo: 'https://github.com/vuestorefront/vue-storefront/',
    docsDir: 'packages/docs',
    docsBranch: 'main',
    editLinkText: 'Edit this page',
    logo: '/vsf-full.svg',
    sidebarDepth: 0,
    nav: [
      {
        text: 'Ecosystem',
        items: [
          { text: 'StorefrontUI', link: 'https://docs.storefrontui.io/' },
          { text: 'Vue Storefront Cloud', link: 'https://docs.vuestorefront.io/cloud/' },
          { text: 'Vue Storefront 1', link: 'https://docs.vuestorefront.io/v1/' },
        ]
      },
      { text: 'Demo', link: 'https://demo.vuestorefront.io/' },
      { text: 'Discord', link: 'https://discord.vuestorefront.io/' }
    ],
    sidebar: [
      {
        title: '',
        collapsable: false,
        children: [
          ['/', '👋 Meet Vue Storefront'],
          ['/integrations/', '🔌 Integrations'],
          ['/general/enterprise', '🚀 Enterprise'],
          ['/general/support', '🙋 Support']
        ]
      },
      {
        title: 'Getting started',
        collapsable: false,
        children: [
          ['/getting-started/introduction', 'Introduction'],
          ['/getting-started/installation', 'Installation'],
          ['/getting-started/project-structure', 'Project structure'],
          ['/getting-started/configuration', 'Configuration'],
          ['/getting-started/layouts-and-routing', 'Layouts and Routing'],
          ['/getting-started/theme', 'Theme'],
          ['/getting-started/internationalization', 'Internationalization']
        ]
      },
      {
        title: 'Composition',
        collapsable: true,
        children: [
          ['/composition/composables', 'Composables'],
          ['/composition/getters', 'Getters'],
          ['/composition/error-handling', 'Error Handling'],
          ['/composition/extending-graphql-queries', 'Extending GraphQL queries'],
          ['/composition/creating-custom-composables', 'Creating custom composables']
        ]
      },
      {
        title: 'Architecture',
        collapsable: true,
        children: [
          ['/architecture/networking', 'Networking'],
          ['/architecture/application-context', 'Application context'],
          ['/architecture/server-middleware', 'Server Middleware']
        ]
      },
      {
        title: 'Extending Vue Storefront',
        collapsable: true,
        children: [
          ['/integrate/extending-vue-storefront', 'Extending Vue Storefront'],
          ['/integrate/extending-integrations', 'Extending integrations'],
          ['/integrate/cookie-based-config', 'Cookie-based configuration'],
          ['/integrate/integration-guide', 'Integrating e-commerce platform'],
          ['/integrate/cms', 'Integrating CMS platform'],
          ['/integrate/cache-driver', 'Integrating cache driver'],
          ['/integrate/payment', 'Integrating payments solutions']
        ]
      },
      {
        title: 'Troubleshooting',
        collapsable: true,
        children: [
          ['/troubleshooting/inspecting-network-requests', 'Inspecting network requests']
        ]
      },
      {
        title: 'Performance',
        collapsable: true,
        children: [
          ['/performance/intro', 'Introduction'],
          ['/performance/improving-core-web-vitals', 'Improving Core Web Vitals'],
          ['/performance/optimizing-html-and-css', 'Optimizing HTML and CSS'],
          ['/performance/optimizing-images', 'Optimizing images'],
          ['/performance/optimizing-javascript', 'Optimizing JavaScript'],
          ['/performance/other-optimizations', 'Other optimizations'],
          ['/performance/ssr-cache', 'SSR cache']
        ]
      },
      {
        title: 'Security',
        collapsable: true,
        children: [
          ['/security/headers-security', 'HTTP Headers security'],
          ['/security/api-url', 'Server Middleware URL']
        ]
      },
      {
        title: 'Reference',
        collapsable: true,
        children: [
          ['/reference/api/', 'API Reference'],
          ['/reference/migrate/', 'Migration guide'],
          ['/reference/changelog', 'Changelog']
        ]
      },
      {
        title: 'Community',
        collapsable: true,
        children: [
          ['/community/sponsorship-program', '✍️ Sponsorship Program']
        ]
      },
      {
        title: 'Contributing',
        collapsable: true,
        children: [
          ['/contributing/', 'Contribution basics'],
          ['/contributing/branching-model', 'Branching model'],
          ['/contributing/how-to-submit-pull-request', 'How to submit a Pull Request']
        ]
      }
    ]
  }
};
