const Handlebars = require('handlebars');

Handlebars.registerHelper('split', (string) => {
  return string.split('/')[1];
});
