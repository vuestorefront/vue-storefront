const fs = require('fs');

const path = './commercetools/api-client-reference/1modules';

const files = fs.readdirSync(path);

files.map(file => {
  if (file.search(/defaultmutation|defaultquery|_setup/) !== -1) {
    fs.unlink(`${path}/${file}`, err => {
      if (err) {
        console.error(err);
      }
    });
  }
});
