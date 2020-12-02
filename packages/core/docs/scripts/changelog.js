const fs = require('fs');

const commandArgs = process.argv.slice(2);

const releaseVersion = commandArgs[commandArgs.findIndex(arg => arg === '--v') + 1];

const DEFAULT_IN = commandArgs[commandArgs.findIndex(arg => arg === '--in')] ? commandArgs[commandArgs.findIndex(arg => arg === '--in') + 1] : '../changelog';

const DEFAULT_OUT = commandArgs[commandArgs.findIndex(arg => arg === '--out')] ? commandArgs[commandArgs.findIndex(arg => arg === '--out') + 1] : '../contributing/changelog.md';

const prNumbers = fs.readdirSync(DEFAULT_IN);

const numberOfPR = prNumbers.map(el => el.substr(0, el.lastIndexOf('.')));

const finalData = prNumbers.map(el => require(DEFAULT_IN + '/' + el))
  .map((el, i) => '\n - ' + (el.isBreaking ? '[BREAKING] ' : '') + el.description + ' ([#' + numberOfPR[i] + '](' + el.link + ')) - [' + el.author + '](' + el.linkToGitHubAccount + ')' +
    (el.isBreaking ? ' \n\n | Before | After | Comment | Module  \n | --------- | -------- | -------- | -------- ' + el.breakingChanges
      .map(br => '\n | ' + br.before + ' | ' + br.after + ' | ' + br.comment + ' | ' + br.module + '|') : ''));

const changelogData = fs.readFileSync(DEFAULT_OUT).toString().split('\n');

const versionExists = changelogData
  .map(el => el.indexOf(releaseVersion))
  .findIndex(el => el > -1);

changelogData.splice(versionExists > -1 ? versionExists + 1 : 1, 0, versionExists > -1 ? finalData : '\n## ' + releaseVersion + '\n' + finalData);
const text = changelogData.join('\n');

fs.writeFile(DEFAULT_OUT, text, (err) => {
  if (err) return err;
});

prNumbers.map(el => fs.unlinkSync(`${DEFAULT_IN}/${el}`));
