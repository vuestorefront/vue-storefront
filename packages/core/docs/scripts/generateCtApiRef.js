const TypeDoc = require('typedoc');

const app = new TypeDoc.Application();

// If you want TypeDoc to load tsconfig.json / typedoc.json files
app.options.addReader(new TypeDoc.TSConfigReader());
app.options.addReader(new TypeDoc.TypeDocReader());

app.bootstrap({
  tsconfig: '../../commercetools/api-client/tsconfig.json',
  entryPoints: ['../../commercetools/api-client/src/api'],
  name: 'API Client Reference'
});

const project = app.convert();

if (project) {
  const outputDir = './commercetools/api-client-reference';
  app.generateDocs(project, outputDir);
  // app.generateJson(project, outputDir + '.json');
}
