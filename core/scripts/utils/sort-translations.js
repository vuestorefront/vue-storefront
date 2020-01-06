const { readFileSync, writeFileSync } = require('fs');
const { EOL } = require('os');

const fixTranslation = (filename) => {
  const content = readFileSync(filename, 'utf8');

  writeFileSync(
    filename,
    content
      .split(EOL)
      .sort()
      .filter(line => line.length > 0)
      .join(EOL) + EOL
  );
}

process.argv.map(filename => {
  filename.split('.').pop() === 'csv' && fixTranslation(filename);
});
