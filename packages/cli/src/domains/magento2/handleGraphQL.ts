import { spawn } from 'child_process';
import fs from 'fs';
import {
  logSimpleWarningMessage,
  startLoggingProgress,
  stopLoggingProgressError,
  stopLoggingProgressSuccess
} from './terminalHelpers';
import { CliUx } from '@oclif/core';

const handleGraphQL = async (magentoDirName: string) => {
  const options = {
    cwd: magentoDirName,
    shell: true
  };

  const increaseQueryDepthAndComplexity = async () => {
    fs.readFile(
      `${magentoDirName}/src/vendor/magento/module-graph-ql/etc/di.xml`,
      'utf8',
      function (err, data) {
        if (err) {
          return console.log(err);
        }

        const result = data.replace(
          /<argument name="queryComplexity" xsi:type="number">300<\/argument>/g,
          '<argument name="queryComplexity" xsi:type="number">1500</argument>'
        );

        fs.writeFile(
          `${magentoDirName}/src/vendor/magento/module-graph-ql/etc/di.xml`,
          result,
          'utf8',
          function (err) {
            if (err) return console.log(err);
          }
        );

        fs.writeFile(
          `${magentoDirName}/src/vendor/magento/module-graph-ql/etc/di.xml`,
          result,
          'utf8',
          function (err) {
            if (err) return console.log(err);
          }
        );
      }
    );
  };

  return new Promise((resolve) => {
    const child = spawn(
      'bin/composer require caravelx/module-graphql-config && bin/magento module:enable Caravel_GraphQlConfig && bin/magento setup:upgrade && bin/magento setup:di:compile && bin/magento setup:static-content:deploy -f',
      options
    );

    startLoggingProgress('Enabling GraphQL module for Magento 2');

    child.stderr.on('data', (data) => {
      logSimpleWarningMessage(data.toString());
    });

    child.on('close', (code) => {
      if (code === 0) {
        increaseQueryDepthAndComplexity();
        stopLoggingProgressSuccess('GraphQL module enabled successfully');
        CliUx.ux.wait(500);
        resolve(1);
      } else {
        stopLoggingProgressError('GraphQL module enabling failed');
        resolve(1);
      }
    });
  });
};

export default handleGraphQL;
