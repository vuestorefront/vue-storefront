const { resolve } = require('path');
const { STATUSES, AVAILABILITY, CATEGORIES, INTEGRATIONS } = require('./integrations');
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
   * Ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    GTM_TAG,
    STATUSES,
    AVAILABILITY,
    CATEGORIES,
    INTEGRATIONS,
    repo: 'https://github.com/vuestorefront/vue-storefront/',
    editLinks: true,
    docsDir: 'packages/core/docs',
    docsBranch: 'release/next',
    editLinkText: 'Edit this page',
    logo: '/vsf-full.svg',
    sidebarDepth: 0,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Demo', link: 'https://demo-ct.vuestorefront.io' },
      { text: 'Roadmap', link: 'https://www.notion.so/vuestorefront/Vue-Storefront-2-Next-High-level-Roadmap-201cf06abb314b84ad01b7b8463c0437' }
    ],
    sidebar: {
      '/commercetools/': [
        {
          title: 'Essentials',
          collapsable: false,
          children: [
            ['/commercetools/', 'Introduction'],
            ['/commercetools/store-setup', 'Store setup'],
            ['/commercetools/configuration', 'Configuration'],
            ['/commercetools/authorization-strategy', 'Authorization'],
            ['/enterprise/feature-list', 'Feature list'],
            ['/commercetools/maintainers', 'Maintainers and support'],
          ]
        },
        {
          title: 'How-to guides',
          collapsable: true,
          children: [
            ['/commercetools/guide/authentication', 'Authentication'],
            ['/commercetools/guide/cart', 'Cart'],
            ['/commercetools/guide/checkout', 'Checkout'],
            ['/commercetools/guide/product-catalog', 'Product catalog'],
            ['/commercetools/guide/user-profile', 'User profile'],
            ['/commercetools/guide/wishlist', 'Wishlist'],
          ]
        },
        {
          title: 'Composables',
          collapsable: true,
          children: [
            ['/commercetools/composables/use-billing', 'useBilling'],
            ['/commercetools/composables/use-cart', 'useCart'],
            ['/commercetools/composables/use-category', 'useCategory'],
            ['/commercetools/composables/use-facet', 'useFacet'],
            ['/commercetools/composables/use-forgot-password', 'useForgotPassword'],
            ['/commercetools/composables/use-make-order', 'useMakeOrder'],
            ['/commercetools/composables/use-product', 'useProduct'],
            ['/commercetools/composables/use-review', 'useReview'],
            ['/commercetools/composables/use-shipping-provider', 'useShippingProvider'],
            ['/commercetools/composables/use-shipping', 'useShipping'],
            ['/commercetools/composables/use-store', 'useStore'],
            ['/commercetools/composables/use-user-billing', 'useUserBilling'],
            ['/commercetools/composables/use-user-order', 'useUserOrder'],
            ['/commercetools/composables/use-user-shipping', 'useUserShipping'],
            ['/commercetools/composables/use-user', 'useUser'],
            ['/commercetools/composables/use-wishlist', 'useWishlist']
          ]
        },
        {
          title: 'Theme',
          collapsable: true,
          children: [
            ['/commercetools/auth-middleware', 'Auth Middleware']
          ]
        },
        {
          title: 'Reference',
          collapsable: true,
          children: [
            ['/commercetools/api-reference/', 'API Reference'],
            ['/commercetools/migrate/', 'Migration guide'],
            ['/commercetools/changelog', 'Changelog']
          ]
        }
      ],
      '/': [
        {
          title: '',
          collapsable: false,
          children: [
            ['/', '👋 Meet Vue Storefront'],
            ['/general/installation', '💻 Installation'],
            ['/integrations/', '🔌 Integrations'],
            ['/general/enterprise', '🚀 Enterprise'],
            ['/general/support', '🙋 Support'],
          ]
        },
        {
          title: 'Getting started',
          collapsable: false,
          children: [
            ['/general/key-concepts', 'Key concepts'],
            ['/guide/theme', 'Theme'],
            ['/guide/configuration', 'Configuration'],
            ['/advanced/internationalization', 'Internationalization'],
            ['/advanced/logging', 'Logging'],
            // ['/', 'Glossary']
          ]
        },
        {
          title: 'Composition',
          collapsable: true,
          children: [
            ['/guide/composition-api', 'Composition API'],
            ['/guide/composables', 'Composables'],
            ['/guide/getters', 'Getters'],
            ['/guide/error-handling', 'Error Handling'],
            ['/advanced/creating-custom-composables', 'Creating custom composables'],
            ['/advanced/extending-graphql-queries', 'Extending GraphQL queries']
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
            ['/integrate/integration-guide', 'Integrating eCommerce platform'],
            ['/integrate/cms', 'Integrating CMS platform'],
            ['/integrate/cache-driver', 'Integrating cache driver']
          ]
        },
        {
          title: 'Performance',
          collapsable: true,
          children: [
            ['/advanced/performance', 'Performance basics'],
            ['/advanced/ssr-cache', 'SSR cache']
          ]
        },
        // {
        //   title: 'Deployment',
        //   collapsable: true,
        //   children: [
        //     ['/', 'Deyploment basics'],
        //     ['/', 'Continuous Integration (CI)'],
        //     ['/', 'End-to-End testing (E2E)']
        //   ]
        // },
        {
          title: 'Reference',
          collapsable: true,
          children: [
            ['/core/api-reference/', 'API Reference'],
            ['/migrate/', 'Migration guide'],
            ['/contributing/changelog', 'Changelog']
          ]
        },
        {
          title: 'Contributing',
          collapsable: true,
          children: [
            ['/contributing/', 'Contribution basics'],
            ['/contributing/api-design-philosophy', 'Rules and conventions'],
            ['/contributing/creating-changelog', 'Creating changelog'],
            ['/contributing/themes', 'Working with themes'],
            ['/contributing/server-side-rendering', 'Server-side rendering']
          ]
        }
      ]
    }
  }
};
