module.exports = {
  base: '/vue-storefront/',
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  themeConfig: {
    repo: 'DivanteLtd/vue-storefront',
    docsDir: 'docs',
    editLinks: true,
    nav: [],
    sidebar: {
      '/guide/': [
        '',
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
            'basics/project-structure',
            'basics/configuration',
            'basics/contributing',
            'basics/modules',
            'basics/typescript',
          ],
        },
        // {
        //   title: 'Vue Storefront core and themes',
        //   collapsable: false,
        //   children: [
        //     'core-themes/themes',
        //     'core-themes/webpack',
        //     'core-themes/core-components',
        //     'core-themes/plugins',
        //     'core-themes/vuex',
        //     'core-themes/data',
        //     'core-themes/extensions',
        //   ],
        // },
        // {
        //   title: 'Data in Vue Storefront',
        //   collapsable: false,
        //   children: ['data/data'],
        // },
        // {
        //   title: 'Working with extensions',
        //   collapsable: false,
        //   children: ['extensions/'],
        // },
        // {
        //   title: 'Integrations',
        //   collapsable: false,
        //   children: ['integrations/magento', 'integrations/multistore'],
        // },
        // {
        //   title: 'Core API Modules docs',
        //   collapsable: false,
        //   children: ['api-modules/cart-module'],
        // },
      ],
    },
  },
  title: 'Vue Storefront',
  description: 'Headless PWA for eCommerce',
};
