const { spawn } = require('child_process');
const csvParse = require('csv-parse');
const fs = require('fs');

const i18nFilename = process.argv[2];
const i18nContent = fs.readFileSync(i18nFilename);

function getPhrasesFromString (data) {
  const defaultRegexp = /(?<=(?<=\$t|i18n\.t)\(')([^()]*)(?='\))/g;

  let phrases = data.match(defaultRegexp);
  let newPhrases = [];

  if (!phrases) {
    phrases = [];
  }

  phrases.forEach((phrase) => {
    if (!newPhrases.includes(phrase)) {
      newPhrases.push(phrase);
    }
  });

  phrases = newPhrases.map((phrase) => {
    return `"${phrase}","${phrase}"`.replace(/\\'/g, "'");
  }).sort();

  return phrases;
}

function updateI18nFile (missingPhrases) {
  fs.writeFileSync(i18nFilename, `\n${missingPhrases.join('\n')}`, { flag: 'a+' });
}

function grepL18nPhrasesFromSources () {
  return new Promise((resolve) => {
    const out = [];
    const errors = [];
    const grep = spawn(
      'grep',
      [
        '-nrw',
        '--include',
        '*.js',
        '--include',
        '*.vue',
        '--include',
        '*.ts',
        '-e',
        'i18n.t',
        '-e',
        '$t',
        '-h'
      ]
    );

    grep.stdout.on('data', chunk => out.push(chunk));
    grep.stderr.on('data', chunk => {
      process.stderr.write(chunk)
      errors.push(chunk)
    });

    grep.on('close', (code) => {
      if (code !== 0) console.error(`grep process exited with code ${code}`)

      const data = out.join('');
      const phrasesFromSources = getPhrasesFromString(data);
      resolve(phrasesFromSources);
    });
  })
}

csvParse.parse(i18nContent, { skipEmptyLines: true }, async (err, records) => {
  if (err) console.error(err);
  const phrasesFromI18nFile = [];

  records.forEach((record) => {
    phrasesFromI18nFile.push(`"${record[0]}","${record[1]}"`.replace(/\\'/g, "'"))
  });

  const phrasesFromSources = await grepL18nPhrasesFromSources();
  const missingPhrases = phrasesFromSources.filter((phrase) => !phrasesFromI18nFile.includes(phrase));

  updateI18nFile(missingPhrases);
  process.stdout.write(`Added ${missingPhrases.length} phrases \n`);
});
