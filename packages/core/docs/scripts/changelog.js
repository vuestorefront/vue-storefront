const { compile } = require('handlebars');
const { readFileSync, writeFileSync, unlinkSync, readdirSync } = require('fs');

// Load changelog template files
const templates = {
  version: readFileSync('./templates/version.hbs', 'utf8'),
  change: readFileSync('./templates/change.hbs', 'utf8')
};

// Get arguments passed to the script
const commandArgs = process.argv.slice(2);
const getCliArgument = name => commandArgs[commandArgs.findIndex(arg => arg === name) + 1];
const version = getCliArgument('--v');
const pathIn = getCliArgument('--in');
const pathOut = getCliArgument('--out');

// Get names of all files in the source directory
const fileName = readdirSync(pathIn);

// Extract IDs of the pull requests from file names
const pullRequestIds = fileName.map(el => el.substr(0, el.lastIndexOf('.')));

// Map PRs into Markdown templates
const changes = fileName
  // eslint-disable-next-line global-require
  .map(el => require(`${pathIn}/${el}`))
  .map((pullRequest, index) => {
    const template = compile(
      templates.change,
      { noEscape: true }
    );

    return template({
      ...pullRequest,
      prNumber: pullRequestIds[index]
    });
  })
  .join('')
  .trim();

// Load changelog file
const changelog = readFileSync(pathOut, 'utf8').split('\n');

// Check if version already exists
const versionLineNumber = changelog
  .map(el => el.indexOf(version))
  .findIndex(el => el > -1);

const template = compile(
  templates.version,
  { noEscape: true }
);

// Update changelog file
versionLineNumber > -1
  ? changelog.splice(versionLineNumber + 2, 0, changes)
  : changelog.splice(2, 0, template({ version, changes }));

// Write updated changelog file
writeFileSync(pathOut, changelog.join('\n'));

// Delete files from source directory
fileName.map(el => unlinkSync(`${pathIn}/${el}`));
