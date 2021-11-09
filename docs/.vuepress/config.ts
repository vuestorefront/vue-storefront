import { resolve } from 'path';
import { defineUserConfig } from '@vuepress/cli';
import type { ViteBundlerOptions } from '@vuepress/bundler-vite';
import type { DefaultThemeOptions } from '@vuepress/theme-default';
import { STATUSES, AVAILABILITY, CATEGORIES, INTEGRATIONS } from './integrations';

const GTM_TAG = 'GTM-WMDC3CP';

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  lang: 'en-US',

  bundler: '@vuepress/bundler-vite',

  theme: resolve(__dirname, './theme'),

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
  shouldPrefetch: false,

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],

    // HubSpot
    ['script', { async: true, defer: true, src: 'https://js.hs-scripts.com/8443671.js', id: 'hs-script-loader' }],

    // Google Tag Manager
    ['script', {}, `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_TAG}');
    `],
  ],

  /**
   * Ref：https://v1.vuepress.vuejs.org/plugin/
   */
   plugins: [
    ['@vuepress/plugin-git', {
      createdTime: false,
      updatedTime: false,
      contributors: false
    }],
    [
      '@vuepress/plugin-medium-zoom',
      {
        // This selector excludes images from the "Integrations" page
        selector: 'main :not(.tile-image) > img'
      }
    ],
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: resolve(__dirname, './components'),
      },
    ],
    '@vuepress/plugin-search',
    // resolve(__dirname, './plugins/meta/index.js')
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
    themePlugins: {
      git: false,
      mediumZoom: false
    },
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Demo', link: 'https://demo-ct.vuestorefront.io' },
      { text: 'Roadmap', link: 'https://www.notion.so/vuestorefront/Vue-Storefront-2-Next-High-level-Roadmap-201cf06abb314b84ad01b7b8463c0437' }
    ],
    sidebar: {
      '/commercetools/': [
        {
          text: 'Essentials',
          children: [
            { link: '/commercetools/', text: 'Introduction' },
            { link: '/commercetools/store-setup', text: 'Store setup' },
            { link: '/commercetools/configuration', text: 'Configuration' },
            { link: '/commercetools/authorization-strategy', text: 'Authorization' },
            { link: '/enterprise/feature-list', text: 'Feature list' },
            { link: '/commercetools/maintainers', text: 'Maintainers and support' },
          ]
        },
        {
          text: 'How-to guides',
          children: [
            { link: '/commercetools/guide/authentication', text: 'Authentication' },
            { link: '/commercetools/guide/cart', text: 'Cart' },
            { link: '/commercetools/guide/checkout', text: 'Checkout' },
            { link: '/commercetools/guide/product-catalog', text: 'Product catalog' },
            { link: '/commercetools/guide/user-profile', text: 'User profile' },
            { link: '/commercetools/guide/wishlist', text: 'Wishlist' },
          ]
        },
        {
          text: 'Composables',
          children: [
            { link: '/commercetools/composables/use-billing', text: 'useBilling' },
            { link: '/commercetools/composables/use-cart', text: 'useCart' },
            { link: '/commercetools/composables/use-category', text: 'useCategory' },
            { link: '/commercetools/composables/use-facet', text: 'useFacet' },
            { link: '/commercetools/composables/use-forgot-password', text: 'useForgotPassword' },
            { link: '/commercetools/composables/use-make-order', text: 'useMakeOrder' },
            { link: '/commercetools/composables/use-product', text: 'useProduct' },
            { link: '/commercetools/composables/use-review', text: 'useReview' },
            { link: '/commercetools/composables/use-shipping-provider', text: 'useShippingProvider' },
            { link: '/commercetools/composables/use-shipping', text: 'useShipping' },
            { link: '/commercetools/composables/use-store', text: 'useStore' },
            { link: '/commercetools/composables/use-user-billing', text: 'useUserBilling' },
            { link: '/commercetools/composables/use-user-order', text: 'useUserOrder' },
            { link: '/commercetools/composables/use-user-shipping', text: 'useUserShipping' },
            { link: '/commercetools/composables/use-user', text: 'useUser' },
            { link: '/commercetools/composables/use-wishlist', text: 'useWishlist' }
          ]
        },
        {
          text: 'Theme',
          children: [
            { link: '/commercetools/auth-middleware', text: 'Auth Middleware' }
          ]
        },
        {
          text: 'Reference',
          children: [
            { link: '/commercetools/api-reference/', text: 'API Reference' },
            { link: '/commercetools/migrate/', text: 'Migration guide' },
            { link: '/commercetools/changelog', text: 'Changelog' }
          ]
        }
      ],
      '/': [
        {
          text: '',
          children: [
            { link: '/', text: '👋 Meet Vue Storefront' },
            { link: '/general/installation', text: '💻 Installation' },
            { link: '/integrations/', text: '🔌 Integrations' },
            { link: '/general/enterprise', text: '🚀 Enterprise' },
            { link: '/general/support', text: '🙋 Support' },
          ]
        },
        {
          text: 'Getting started',
          children: [
            { link: '/general/key-concepts', text: 'Key concepts' },
            { link: '/guide/theme', text: 'Theme' },
            { link: '/guide/configuration', text: 'Configuration' },
            { link: '/advanced/internationalization', text: 'Internationalization' },
            { link: '/advanced/logging', text: 'Logging' },
            // { link: '/', text: 'Glossary' }
          ]
        },
        {
          text: 'Composition',
          children: [
            { link: '/guide/composition-api', text: 'Composition API' },
            { link: '/guide/composables', text: 'Composables' },
            { link: '/guide/getters', text: 'Getters' },
            { link: '/guide/error-handling', text: 'Error Handling' },
            { link: '/advanced/creating-custom-composables', text: 'Creating custom composables' },
            { link: '/advanced/extending-graphql-queries', text: 'Extending GraphQL queries' }
          ]
        },
        {
          text: 'Architecture',
          children: [
            { link: '/architecture/networking', text: 'Networking' },
            { link: '/architecture/application-context', text: 'Application context' },
            { link: '/architecture/server-middleware', text: 'Server Middleware' }
          ]
        },
        {
          text: 'Extending Vue Storefront',
          children: [
            { link: '/integrate/extending-vue-storefront', text: 'Extending Vue Storefront' },
            { link: '/integrate/extending-integrations', text: 'Extending integrations' },
            { link: '/integrate/integration-guide', text: 'Integrating eCommerce platform' },
            { link: '/integrate/cms', text: 'Integrating CMS platform' },
            { link: '/integrate/cache-driver', text: 'Integrating cache driver' }
          ]
        },
        {
          text: 'Performance',
          children: [
            { link: '/advanced/performance', text: 'Performance basics' },
            { link: '/advanced/ssr-cache', text: 'SSR cache' }
          ]
        },
        // {
        //   text: 'Deployment',
        //   children: [
        //     { link: '/', text: 'Deyploment basics' },
        //     { link: '/', text: 'Continuous Integration (CI)' },
        //     { link: '/', text: 'End-to-End testing (E2E)' }
        //   ]
        // },
        {
          text: 'Reference',
          children: [
            { link: '/core/api-reference/', text: 'API Reference' },
            { link: '/migrate/', text: 'Migration guide' },
            { link: '/contributing/changelog', text: 'Changelog' }
          ]
        },
        {
          text: 'Contributing',
          children: [
            { link: '/contributing/', text: 'Contribution basics' },
            { link: '/contributing/api-design-philosophy', text: 'Rules and conventions' },
            { link: '/contributing/creating-changelog', text: 'Creating changelog' },
            { link: '/contributing/themes', text: 'Working with themes' },
            { link: '/contributing/server-side-rendering', text: 'Server-side rendering' }
          ]
        }
      ]
    }
  }
});
