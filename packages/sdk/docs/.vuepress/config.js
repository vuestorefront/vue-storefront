const INTEGRATION_NAME = 'Vue Storefront SDK'; // This should include "Vue Storefront"

module.exports = {
  title: `Vue Storefront 2 for ${INTEGRATION_NAME}`,
  base: '/',
  description: `Documentation for the ${INTEGRATION_NAME} integration for Vue Storefront 2`,
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  theme: 'vsf-docs',
  themeConfig: {
    title: INTEGRATION_NAME,
    repo: 'https://github.com/vuestorefront/sdk',
    secondaryNav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/sdk/' },
      { text: 'Modules', link: '/modules/' },
    ],
    sidebar: {
      '/sdk/': [
        {
          title: 'Getting started',
          collapsable: false,
          children: [
            ['/sdk/', 'Overview'],
            ['/sdk/installation', 'Installation'],
            ['/sdk/initialization', 'Initialization'],
            ['/sdk/extending-module', 'Extending a module'],
          ],
        },
        {
          title: 'Custom integrations',
          collapsable: false,
          children: [
            ['/sdk/custom-integrations/quick-start', 'Quick Start'],
            ['/sdk/custom-integrations/concepts', 'Concepts'],
            ['/sdk/custom-integrations/api-client', 'API Client'],
            ['/sdk/custom-integrations/sdk-module', 'SDK Module'],
          ],
        }
      ],
      '/modules/': [
        {
          title: 'Modules',
          collapsable: false,
          children: [['/modules/', 'Available modules']],
        },
      ],
    },
  },
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#configurewebpack
   */
  plugins: {
    robots: {
      hots: 'https://docs.vuestorefront.io/sdk',
      disallowAll: true,
      sitemap: 'https://docs.vuestorefront.io/sdk/sitemap.xml',
    },
  },
  configureWebpack: (config) => {
    // Add support for webp images
    config.module.rules.push({
      test: /\.(webp)(\?.*)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/img/[name].[hash:8].[ext]',
          },
        },
      ],
    });
    // Fix image loading. Ref: https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
    config.module.rules = config.module.rules.map((rule) => {
      rule.use =
        rule.use &&
        rule.use.map((useRule) => {
          if (useRule.loader === 'url-loader') {
            useRule.options.esModule = false;
          }
          return useRule;
        });
      return rule;
    });
  },
};
