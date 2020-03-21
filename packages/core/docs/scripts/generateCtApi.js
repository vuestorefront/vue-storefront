const TypeDoc = require('typedoc');

const app = new TypeDoc.Application();

// If you want TypeDoc to load tsconfig.json / typedoc.json files
app.options.addReader(new TypeDoc.TSConfigReader());
app.options.addReader(new TypeDoc.TypeDocReader());

app.bootstrap({
  mode: 'modules',
  logger: 'none',
  target: 'ES5',
  module: 'CommonJS',
  experimentalDecorators: true
});

const project = app.convert(app.expandInputFiles(['../../commercetools/api-client/src/api']));

if (project) {
  const outputDir = '.vuepress/dist/commercetools/api-client';
  app.generateDocs(project, outputDir);
}
