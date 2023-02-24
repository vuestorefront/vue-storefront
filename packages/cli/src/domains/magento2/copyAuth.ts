import { spawn } from 'child_process';
import fs from 'fs';
import { logSimpleSuccessMessage, simpleLog } from './terminalHelpers';
import { CliUx } from '@oclif/core';

const copyAuth = async (
  magentoDirName: string,
  accessKey: string,
  secretKey: string
) => {
  const options = {
    cwd: magentoDirName
  };

  const child = spawn('cp', ['src/auth.json.sample', 'src/auth.json'], options);

  const copyToContainer = spawn(
    'bin/copytocontainer',
    ['src/auth.json'],
    options
  );

  child.stdout.on('data', (data) => {
    simpleLog(data.toString());
  });

  child.stderr.on('data', (data) => {
    simpleLog(data.toString());
  });

  child.on('close', () => {
    fs.readFile(
      `${magentoDirName}/src/auth.json`,
      'utf8',
      function (err, data) {
        if (err) {
          return console.log(err);
        }
        let result = data.replace(/<public-key>/g, accessKey);
        result = result.replace(/<private-key>/g, secretKey);

        fs.writeFile(
          `${magentoDirName}/src/auth.json`,
          result,
          'utf8',
          function (err) {
            if (err) return console.log(err);
          }
        );
      }
    );
  });

  copyToContainer.stdout.on('data', (data) => {
    simpleLog(data.toString());
  });

  copyToContainer.stderr.on('data', (data) => {
    simpleLog(data.toString());
  });

  copyToContainer.on('close', () => {
    logSimpleSuccessMessage('Auth.json file has been copied to container');
    CliUx.ux.wait(500);
  });
};

export default copyAuth;
