const fs = require('fs');

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
  .map((pr, i) => {
    const {
      description,
      link,
      isBreaking,
      breakingChanges,
      author,
      linkToGitHubAccount
    } = pr;

    let breakingChangesText = '';

    if (isBreaking) {
      breakingChangesText = `
| Before | After | Comment | Module 
| ------ | ----- | ------ | ------
`;

      breakingChangesText += breakingChanges.map(breakingChange => {
        const module = replaceComponentLinkTags(breakingChange.module);
        const before = replaceComponentLinkTags(breakingChange.before);
        const after = replaceComponentLinkTags(breakingChange.after);
        const comment = replaceComponentLinkTags(breakingChange.comment);

        return `| ${ before } | ${ after } | ${ comment } | ${ module }\n`;
      });
    }

    return `
- ${ isBreaking ? '[BREAKING]' : '' } ${ description } ([#${ numberOfPR[i] }](${ link })) - [${ author }](${ linkToGitHubAccount })
${ breakingChangesText }
`;
  });

const changelogData = fs.readFileSync(pathOut).toString().split('\n');

const versionExists = changelogData
  .map(el => el.indexOf(releaseVersion))
  .findIndex(el => el > -1);

changelogData.splice(versionExists > -1 ? versionExists + 1 : 1, 0, versionExists > -1 ? finalData : '\n## ' + releaseVersion + '\n' + finalData);
const text = changelogData.join('\n');

fs.writeFile(pathOut, text, (err) => {
  if (err) return err;
});

prNumbers.map(el => fs.unlinkSync(`${pathIn}/${el}`));
