module.exports = {
  base: '/',
  port: 8081,
  markdown: {
    toc: {
      includeLevel: [2]
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/diff2html/2.12.1/diff2html.min.js'}]
  ],
  themeConfig: {
    repo: 'DivanteLtd/vue-storefront',
    docsDir: 'docs',
    editLinks: true,
    sidebarDepth: 3,
    nav: [
      {
        text: 'YouTube',
        link: 'https://www.youtube.com/channel/UCkm1F3Cglty3CE1QwKQUhhg',
      },
      {
        text: 'Medium',
        link: 'https://medium.com/the-vue-storefront-journal',
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
        {
          title: 'Cookbook',
          collapsable: false,
          children: [
            'cookbook/data-import',
            'cookbook/elastic',
            'cookbook/setup',
//            'cookbook/integration',
            'cookbook/module',
            'cookbook/theme',
//            'cookbook/common-pitfall',
//            'cookbook/devops',
//            'cookbook/tdd',
//            'cookbook/internals',
//            'cookbook/vue',
//            'cookbook/multistores',
//            'cookbook/migration',
//            'cookbook/history',
            'cookbook/checklist'
          ],
        },
        {
          title: 'Installation',
          collapsable: false,
          children: [
            'installation/linux-mac',
            'installation/windows',
            'installation/magento',
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
            'basics/typescript',
            'basics/graphql',
            'basics/ssr-cache',
            'basics/amp',
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
            'data/data-migrations',
            'data/elastic-queries',
            'data/database-tool',
            'data/entity-types',
            'data/static-data',
            'data/data-loader'
          ],
        },
        {
          title: 'Working with Vuex',
          collapsable: false,
          children: [
            'vuex/introduction',
            'vuex/vuex-conventions',
            'vuex/product-store',
            'vuex/category-store',
            'vuex/stock-store',
            'vuex/attribute-store',
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
            'archives/components'
          ],
        },
      ],
    },
  },
  title: 'Vue Storefront',
  description: 'Headless PWA for eCommerce',
};
