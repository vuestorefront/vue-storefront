module.exports = {
  title: 'VSF Next',
  description: 'Vue Storefront 2 documentation',
  themeConfig: {
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        children: [
          ['/overview', 'Overview'],
          ['/api-client', 'API Client'],
        ],
      },
      {
        title: 'Theme',
        collapsable: false,
        children: [
          ['/theme/auth-middleware', 'Auth Middleware']
        ]
      },
      {
        title: 'Contributing',
        collapsable: false,
        children: [
          ['/contributing/getting-started', 'Getting started'],
          ['/contributing/themes', 'Working with themes'],
        ],
      }
    ]
  }
}
