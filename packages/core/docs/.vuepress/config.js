module.exports = {
  title: 'VSF Next',
  description: 'Vue Storefront 2 documentation',
  locales: {
    '/': {
      title: 'Vue Storefront Next',
      description: ''
    },
    '/commercetools/': {
      title: 'Vue Storefront Commercetools',
      description: ''
    }
  },
  themeConfig: {
    locales: {
      '/' : {
        selectText: 'Choose eCommerce platform',
        label: 'Overview',
        sidebar: [
          {
            title: 'Contributing',
            collapsable: false,
            children: [
              ['/contributing/themes', 'Working with themes'],
            ],
          },
        ]
      },
      '/commercetools/' : {
        // text for the language dropdown
        selectText: 'Commercetools',
        // label for this locale in the language dropdown
        label: 'Commercetools',
        platformName: 'Commercetools',
        sidebar: [
          {
            title: 'Essentials',
            collapsable: false,
            children: [
              ['/commercetools/', 'Introduction'],
              ['/commercetools/getting-started', 'Getting Started'],
              ['/commercetools/api-client', 'API Client'],
            ],
          }, {
            title: 'Theme',
            collapsable: false,
            children: [
              ['/commercetools/auth-middleware', 'Auth Middleware']
            ],
          }
        ]
      }
    }
  }
}
