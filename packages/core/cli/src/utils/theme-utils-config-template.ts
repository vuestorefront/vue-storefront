export const vsfTuConfig = (outputPathName: string, integrationThemePath: string | undefined) => `module.exports = {
  copy: {
    to: '${outputPathName}',
    from: [
      {
        path: '@vue-storefront/nuxt-theme/theme',
        ignore: [],
        variables: {
          options: {
            generate: {
              replace: {
                apiClient: '@vue-storefront/commercetools-api',
                composables: '@vue-storefront/commercetools'
              }
            }
          }
        },
        watch: false
      },
      {
        path: '${integrationThemePath || '.'}',
        ignore: ['_theme/**', 'generate-template.ts', 'theme-utils.config.js', ],
        variables: {},
        watch: false
      }
    ]
  }
}`;
