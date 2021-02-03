const TypeDoc = require('typedoc');

const app = new TypeDoc.Application();

// If you want TypeDoc to load tsconfig.json / typedoc.json files
app.options.addReader(new TypeDoc.TSConfigReader());
app.options.addReader(new TypeDoc.TypeDocReader());

app.bootstrap({
  tsconfig: '../../commercetools/composables/tsconfig.json',
  entryPoints: [
    '../../commercetools/composables/src/useCart',
    '../../commercetools/composables/src/useCategory',
    '../../commercetools/composables/src/useCheckout',
    '../../commercetools/composables/src/useFacet',
    '../../commercetools/composables/src/useProduct',
    '../../commercetools/composables/src/useReview',
    '../../commercetools/composables/src/useUser',
    '../../commercetools/composables/src/useUserBilling',
    '../../commercetools/composables/src/useUserOrders',
    '../../commercetools/composables/src/useUserShipping',
    '../../commercetools/composables/src/useWishlist'
  ],
  name: 'API Reference'
});

const project = app.convert();

if (project) {
  const outputDir = './commercetools/api-composables-reference';
  app.generateDocs(project, outputDir);
  // app.generateJson(project, outputDir + '.json');
}
