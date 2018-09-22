module.exports = {
  base: '/',
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
            'installation/configuration',
          ],
        },
        {
          title: 'Basics',
          collapsable: false,
          children: ['basics/project-structure'],
        },
        {
          title: 'Vue Storefront core and themes',
          collapsable: false,
          children: ['core-themes/themes'],
        },
        {
          title: 'Data in Vue Storefront',
          collapsable: false,
          children: ['data/data'],
        },
        {
          title: 'Working with extensions',
          collapsable: false,
          children: ['extensions/'],
        },
        {
          title: 'Integrations',
          collapsable: false,
          children: ['integrations/magento', 'integrations/multistore'],
        },
        {
          title: 'Core API Modules docs',
          collapsable: false,
          children: ['api-modules/cart-module'],
        },
      ],
    },
  },
  title: 'Vue Storefront',
  description: 'Headless PWA for eCommerce',
};
