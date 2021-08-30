const fs = require('fs');
const ejs = require('ejs');

const templates = {
  version: fs.readFileSync('./templates/version.md', 'utf8').trim(),
  change: fs.readFileSync('./templates/change.md', 'utf8')
};

const commandArgs = process.argv.slice(2);

const getCliArgument = (name, number) => {
  return commandArgs[commandArgs.findIndex(arg => arg === name) + number];
};

const replaceComponentLinkTags = (text) => {
  return text
    .replace('<', '&lt;')
    .replace('>', '&gt;');
};

const releaseVersion = getCliArgument('--v', 1);
const pathIn = getCliArgument('--in', 0) ? getCliArgument('--in', 1) : '../changelog';
const pathOut = getCliArgument('--out', 0) ? getCliArgument('--out', 1) : '../contributing/changelog.md';
const prNumbers = fs.readdirSync(pathIn);
const numberOfPR = prNumbers.map(el => el.substr(0, el.lastIndexOf('.')));

const finalData = prNumbers
  // eslint-disable-next-line global-require
  .map(el => require(`${pathIn}/${el}`))
  .map((pr, index) => {
    return ejs.render(templates.change, {
      ...pr,
      prNumber: numberOfPR[index],
      breakingChanges: pr.breakingChanges.map(breakingChange => ({
        module: replaceComponentLinkTags(breakingChange.module),
        before: replaceComponentLinkTags(breakingChange.before),
        after: replaceComponentLinkTags(breakingChange.after),
        comment: replaceComponentLinkTags(breakingChange.comment)
      }))
    });
  })
  .join('');

const changelogData = fs.readFileSync(pathOut, 'utf8').split('\n');

const versionExists = changelogData
  .map(el => el.indexOf(releaseVersion))
  .findIndex(el => el > -1);

changelogData.splice(
  versionExists > -1 ? versionExists + 1 : 2,
  0,
  versionExists > -1 ? finalData : ejs.render(templates.version, { version: releaseVersion, changes: finalData })
);

fs.writeFileSync(pathOut, changelogData.join('\n'));
prNumbers.map(el => fs.unlinkSync(`${pathIn}/${el}`));
