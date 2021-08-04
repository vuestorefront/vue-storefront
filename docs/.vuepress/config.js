const GTM_TAG = 'GTM-WMDC3CP';

module.exports = {
  title: 'Vue Storefront 1',
  base: '/v1/',
  description: 'Vue Storefront 1 documentation',
  port: 8081,
  markdown: {
    toc: {
      includeLevel: [2]
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/diff2html/2.12.1/diff2html.min.js'}],
    // HubSpot
    ['script', { async: true, defer: true, src: 'https://js.hs-scripts.com/8443671.js', id: 'hs-script-loader' }],
    // Google Tag Manager
    ['script', {}, [`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_TAG}');
    `]]
  ],
  themeConfig: {
    GTM_TAG,
    repo: 'vuestorefront/vue-storefront',
    docsDir: 'docs',
    editLinks: true,
    sidebarDepth: 3,
    nav: [
      {
        text: 'YouTube',
        link: 'https://www.youtube.com/channel/UCkm1F3Cglty3CE1QwKQUhhg',
      },
      {
        text: 'Blog',
        link: 'https://blog.vuestorefront.io/',
      },
    ],
    sidebar: {
      '/guide/': [
      	{
          title : 'General Information',
          collapsable: false,
          children: [
            'general/introduction'
          ]
	      },
        'upgrade-notes/',
        'security/',
        {
          title: 'Cookbook',
          collapsable: false,
          children: [
            'cookbook/data-import',
            'cookbook/elastic',
            'cookbook/setup',
            'cookbook/module',
            'cookbook/theme',
            'cookbook/checklist'
          ],
        },
        {
          title: 'Installation',
          collapsable: false,
          children: [
            'installation/theme',
            'installation/production-setup',
          ],
        },
        {
          title: 'Basics',
          collapsable: false,
          children: [
            'basics/release-cycle',
            'basics/project-structure',
            'basics/configuration',
            'basics/contributing',
            'basics/feature-list',
            'basics/recipes',
            'basics/ssr-cache',
            'basics/static-generator',
            'basics/e2e',
            'basics/url'
          ],
        },
        {
          title: 'Core and themes',
          collapsable: false,
          children: [
            'core-themes/themes',
            'core-themes/layouts',
            'core-themes/core-components',
            'core-themes/ui-store',
            'core-themes/translations',
            'core-themes/service-workers',
            'core-themes/webpack',
            'core-themes/plugins',
            'core-themes/stylesheets',
          ],
        },
        {
          title: 'Data in Vue Storefront',
          collapsable: false,
          children: [
            'data/data',
            'data/elasticsearch',
            'data/elastic-queries',
            'data/database-tool',
            'data/static-data',
            'data/data-loader'
          ],
        },
        {
          title: 'Integrations',
          collapsable: false,
          children: [
            'integrations/integrations',
            'integrations/reviews',
            'integrations/payment-gateway',
            'integrations/paypal-payments',
            'integrations/direct-prices-sync',
            'integrations/tier-prices-sync',
            'integrations/totals-sync',
            'integrations/multistore',
          ],
        },
        {
          title: 'Data Resolvers',
          collapsable: false,
          children: [
            'data-resolvers/introduction',
            'data-resolvers/category-service',
            'data-resolvers/user-service',
          ]
        },
        {
          title: 'Archives',
          collapsable: true,
          children: [
            'archives/modules',
            'archives/extensions',
            'archives/components',
            'archives/vuex',
            'archives/cookbook',
            'archives/graphql',
            'archives/amp',
            'archives/typescript',
            'archives/migration',
            'archives/entity_type'
          ],
        },
      ],
    },
  }
};
