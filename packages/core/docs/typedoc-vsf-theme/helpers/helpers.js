const Handlebars = require('handlebars');

const re = /(api\/|types\/)/g;

Handlebars.registerHelper('split', (string) => {
  if (string.search(re) !== -1) return string.split('/')[1];
  else return string;
});

Handlebars.registerHelper('heading', (string) => {
  if (string.search(re) !== -1) return '##';
  else return '###';
});
