module.exports = {
  title: 'VSF Next',
  description: 'Vue Storefront 2 documentation',
  themeConfig: {
    sidebar: [
      {
        title: 'Contributing',
        collapsable: false,
        children: [
          ['/contributing/getting-started', 'Getting started'],
        ],
      },
      {
        title: 'Commerce Tools',
        collapsable: false,
        children: [
          ['/commercetools/introduction', 'Getting started'],
          ['/commercetools/api-client', 'API Client'],
        ],
      },
    ]
  }
}
