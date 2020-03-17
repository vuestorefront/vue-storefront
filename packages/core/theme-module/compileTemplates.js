const template = require('lodash/template');
const fs = require('fs');
const path = require('path');

function ensureDirectoryExists (filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
}

module.exports = function compileTemplates(templateDir, outDir, options) {
  fs.readFile(templateDir, 'utf8', (err, data) => {
    const compiled = template(data, {
      interpolate: /<%=([\s\S]+?)%>/g
    });

    const optionsApplied = compiled({ options });

    ensureDirectoryExists(outDir);
    fs.writeFile(outDir, optionsApplied, err =>{
      if (err) throw err;
    });
  });
};
