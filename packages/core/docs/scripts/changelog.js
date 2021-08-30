const fs = require('fs');
const ejs = require('ejs');

// Load changelog template files
const templates = {
  version: fs.readFileSync('./templates/version.md', 'utf8').trim(),
  change: fs.readFileSync('./templates/change.md', 'utf8').trim()
};

// Get arguments passed to the script
const commandArgs = process.argv.slice(2);
const getCliArgument = name => commandArgs[commandArgs.findIndex(arg => arg === name) + 1];
const version = getCliArgument('--v');
const pathIn = getCliArgument('--in');
const pathOut = getCliArgument('--out');

// Read files from source directory
const files = fs.readdirSync(pathIn);

// Extract PR ids from file names
const pullRequestIds = files.map(el => el.substr(0, el.lastIndexOf('.')));

// Map PRs into Markdown templates
const changes = files
  // eslint-disable-next-line global-require
  .map(el => require(`${pathIn}/${el}`))
  .map((pullRequest, index) => {
    return ejs.render(templates.change, {
      ...pullRequest,
      prNumber: pullRequestIds[index]
    });
  })
  .join('')
  .replace('<', '&lt;')
  .replace('>', '&gt;');

// Load changelog file
const changelog = fs.readFileSync(pathOut, 'utf8').split('\n');

// Check if version already exists
const versionExists = changelog
  .map(el => el.indexOf(version))
  .findIndex(el => el > -1);

// Update changelog file
versionExists > -1
  ? changelog.splice(versionExists + 2, 0, changes)
  : changelog.splice(2, 0, ejs.render(templates.version, { version, changes }));

// Write updated changelog file
fs.writeFileSync(pathOut, changelog.join('\n'));

// Delete files from source directory
// files.map(el => fs.unlinkSync(`${pathIn}/${el}`));
