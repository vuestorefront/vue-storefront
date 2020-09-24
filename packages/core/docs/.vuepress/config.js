module.exports = {
  title: 'Vue Storefront Next',
  description: 'Vue Storefront 2 documentation',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Contributing', link: '/contributing/' },
      { text: 'Changelog', link: '/contributing/changelog' },
      { text: 'Demo', link: 'https://vsf-next-demo.storefrontcloud.io' }
    ],
    sidebar: {
      '/': [
        {
          title: 'Essentials',
          children: [
            ['/get-started/api-design-philosophy', 'API design'],
            ['/get-started/themes', 'Working with themes'],
          ]
        },
        {
          title: 'Integrations',
          children: [
            ['/integrations/', 'Introduction'],
            ['/integrations/step-by-step-guide', 'Get started'],
            ['/commercetools/', 'Commercetools'],
            ['/shopify/', 'Shopify'],
            ['/aboutyou/', 'About you'],
            ['https://shopware-pwa-docs.netlify.com/#introduction-to-shopware-pwa', 'Shopware'],
            ['https://github.com/DivanteLtd/vue-storefront', 'Magento']
          ]
        },
        {
          title: 'Core',
          children: [
            ['/vsf-core/', 'Essentials'],
            ['/vsf-core/i18n', 'i18n'],
            ['/vsf-core/server-side-rendering', 'Server-side rendering'],
            ['/vsf-core/faceting', 'Faceting']
          ]
        },
      ],
      '/integrations/': [
        ['/integrations/', 'Introduction'],
      ],
      '/contributing/': [
        ['/contributing/', 'Contributing'],
        ['/contributing/changelog', 'Changelog']
      ],
      '/commercetools/': [
        {
          title: 'Essentials',
          collapsable: false,
          children: [
            ['/commercetools/', 'Introduction'],
            ['/commercetools/getting-started', 'Getting Started'],
            ['/commercetools/api-client', 'API Client'],
            ['/commercetools/composables', 'Composables'],
            ['/commercetools/feature-list', 'Feature list'],
            ['/commercetools/maintainers', 'Maintainers and support'],
            ['/commercetools/changelog', 'Changelog']
          ]
        },
        {
          title: 'Composables',
          collapsable: false,
          children: [
            ['/commercetools/use-product', 'useProduct'],
            ['/commercetools/use-review', 'useReview']
            ['/commercetools/use-facet', 'useFacet'],
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
            ['/aboutyou/use-cart', 'useCart'],
            ['/aboutyou/use-product', 'useProduct'],
            ['/aboutyou/use-wishlist', 'useWishlist'],
          ]
        }
      ],
      '/shopify/': [
        {
          title: 'Essentials',
          collapsable: false,
          children: [
            ['/shopify/', 'Introduction'],
            ['/shopify/getting-started', 'Getting Started'],
            ['/shopify/api-client', 'API Client'],
            ['/shopify/composables', 'Composables'],
            ['/shopify/feature-list', 'Feature list'],
            ['/shopify/maintainers', 'Maintainers and support']
          ]
        },
        {
          title: 'Composables',
          collapsable: false,
          children: [
            ['/shopify/use-cart', 'useCart'],
            ['/shopify/use-category', 'useCategory'],
            ['/shopify/use-content', 'useContent'],
            ['/shopify/use-product', 'useProduct'],
            ['/shopify/use-search', 'useSearch'],
            ['/shopify/use-user', 'useUser'],
            ['/shopify/use-user-orders', 'useUserOrders'],
          ]
        }, {
          title: 'Other',
          collapsable: false,
          children: [
            ['/shopify/checkout', 'Checkout']
          ],
        }
      ]
    }
  }
}
