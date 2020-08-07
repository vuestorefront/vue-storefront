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
        text: 'Blog',
        link: 'https://blog.vuestorefront.io/',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title : 'Essentials',
          collapsable: false,
          children: [
            'general/introduction',
            'general/architecture',
            'general/extendibility',
            'general/agnosticism'
          ]
        },
        {
          title : 'Integration',
          collapsable: false,
          children: [
            'integration/overview'
          ]
        },
        {
          title : 'commercetools',
          collapsable: false,
          children: [
            'ct/setup',
            'ct/api',
            'ct/composables',
            'ct/featurelist',
            'ct/theme'
          ]
        }
      ],
    },
  },
  title: 'Vue Storefront',
  description: 'Headless PWA for eCommerce',
};
