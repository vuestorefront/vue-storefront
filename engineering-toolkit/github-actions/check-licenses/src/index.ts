import * as core from '@actions/core';
import checker from 'license-checker';
import process from 'node:process';

const ALLOWED_LICENSES = [
 "CC-BY-3.0",
 "Public Domain",
 "BSD*",
 "0BSD",
 "Artistic-2.0",
 "Apache-2.0",
"Unlicense",
"ISC",
"MIT",
"BSD-2-Clause",
"BSD-3-Clause",
"CC0-1.0",
"UNKNOWN",
"Custom: https://docs.vuestorefront.io/",
"Custom: https://nuxtjs.org",
"CC-BY-4.0",
"LGPL-3.0",
];

async function run(): Promise<void> {
  const startPath = core.getInput('startPath');
  try {
    core.info(`Checking licenses used in the project: ${startPath}`);
    checker.init({
      start: startPath,
      summary: true,
      onlyAllow: ALLOWED_LICENSES.join(';')
  }, function(error, packages) {
      if (error) {
        core.error(error.message);
        core.setFailed('Detected circular dependencies');
       
      } else {
        core.info(JSON.stringify(packages));
      }
  });
  } catch (error) {
    core.error(error.message);
    core.setFailed('There was an error during license check process');
  }
}

run();