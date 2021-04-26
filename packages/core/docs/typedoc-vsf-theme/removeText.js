const fs = require('fs');

const path = './commercetools/api-client-reference.md';

fs.readFile(path, 'utf8', (err, data) => {
  if (err) throw err;
  const result = data
    .replace(/• \*\*settings\*\*: \*any\*/g, '')
    .replace(/`settings` \| \*any\* |/g, '')
    .replace(/## `Api`/, '## `Types`')
    .replace(/(## `GraphQL`|## `setup`)/g, '');

  fs.writeFile(path, result, 'utf8', (err) => {
    if (err) return console.log(err);
  });
});
