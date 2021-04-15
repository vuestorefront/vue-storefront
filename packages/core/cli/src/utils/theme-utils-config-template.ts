export const vsfTuConfig = (outputPathName: string, integrationThemePath: string | undefined) => `module.exports = {
  copy: {
    to: '${outputPathName}',
    from: [
      {
        path: '${integrationThemePath || '.'}',
        ignore: ['_theme/**', 'generate-template.ts', 'theme-utils.config.js'],
        variables: {},
        watch: false
      },
      {
        path: '${integrationThemePath ? integrationThemePath + '_theme' : '_theme'}',
        watch: false
      }
    ]
  }
}`;
