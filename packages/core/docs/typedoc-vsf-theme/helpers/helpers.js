const Handlebars = require('handlebars');

Handlebars.registerHelper('split', (string) => {
  const re = /(api\/|types\/)/g;
  if (string.search(re) !== -1) return string.split('/')[1];
  else return string;
});
