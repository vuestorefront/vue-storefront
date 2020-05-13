module.exports = {
  title: 'Vue Storefront Next',
  description: 'Vue Storefront 2 documentation',
  themeConfig: {
    nav: [
      { text: 'General information', link: '/' },
      { text: 'Commercetools', link: '/commercetools/' },
      { text: 'About You Cloud', link: '/aboutyou/' },
      { text: 'Shopware', items: [
        { text: 'Documentation' , link: 'https://shopware-pwa-docs.netlify.com/#introduction-to-shopware-pwa'},
        { text: 'Demo' , link: 'https://shopware-pwa.storefrontcloud.io/'},
        { text: 'GitHub' , link: 'https://github.com/DivanteLtd/shopware-pwa'}
      ]},
      { text: 'Magento', items: [
        { text: 'Documentation' , link: 'https://docs.vuestorefront.io/'},
        { text: 'Demo' , link: 'https://demo.vuestorefront.io/'},
        { text: 'GitHub' , link: 'https://github.com/DivanteLtd/vue-storefront'}
      ]},
      { text: 'Integration tutorial', link: '/integration/' },
      { text: 'Demo', link: 'https://vsf-next-demo.storefrontcloud.io' },
      { text: 'Github', link: 'https://github.com/DivanteLtd/next' },
    ],
    sidebar: {
      '/commercetools/': [
        {
          title: 'Essentials',
          collapsable: false,
          children: [
            ['/commercetools/', 'Introduction'],
            ['/commercetools/getting-started', 'Getting Started'],
            ['/commercetools/api-client', 'API Client'],
            ['/commercetools/composables', 'Composables'],
            ['/commercetools/feature-list', 'Feature list']
          ]
        },
        {
          title: 'Composables',
          collapsable: false,
          children: [
            ['/commercetools/use-product', 'useProduct'],
          ]
        }, {
          title: 'Theme',
          collapsable: false,
          children: [
            ['/commercetools/auth-middleware', 'Auth Middleware']
          ],
        }
      ],
      '/aboutyou/': [
        {
          title: 'Essentials',
          collapsable: false,
          children: [
            ['/aboutyou/', 'Introduction'],
            ['/aboutyou/getting-started', 'Getting Started'],
            ['/aboutyou/api-client', 'API Client'],
            ['/aboutyou/composables', 'Composables'],
            ['/aboutyou/feature-list', 'Feature list']
          ]
        },
        {
          title: 'Composables',
          collapsable: false,
          children: [
            ['/aboutyou/use-product', 'useProduct'],
          ]
        }
      ],
      '/integration/': [
        {
          title: 'Integration tutorial',
          collapsable: false,
          children: [
            ['/integration/', 'Introduction'],
            ['/integration/api-client', 'API Client'],
            ['/integration/composables', 'Composables'],
          ],
        },
      ],
      '/': [
        {
          title: 'Contributing',
          collapsable: false,
          children: [
            ['/contributing/workflow', 'Development workflow'],
            ['/contributing/api-design-philosophy', 'API Design Philosophy'],
            ['/contributing/themes', 'Working with themes'],
          ],
        },
      ],
    }
  }
}
