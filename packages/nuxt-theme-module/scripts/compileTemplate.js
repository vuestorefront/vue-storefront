const ejs = require('ejs');
const fs = require('fs');
const ensureDirectoryExists = require('./ensureDirectoryExists');

module.exports = async function compileTemplate(templatePath, outputPath, options) {
  const data = fs.readFileSync(templatePath, 'utf8');
  const compiledTemplate = ejs.render(
    data,
    { options },
    { filename: templatePath }
  );

  ensureDirectoryExists(outputPath);
  return fs.writeFileSync(outputPath, compiledTemplate);
};
