import { spawn } from 'child_process';
import {
  logSimpleWarningMessage,
  startLoggingProgress,
  stopLoggingProgressError,
  stopLoggingProgressSuccess
} from './terminalHelpers';
import { CliUx } from '@oclif/core';

const handleSampleData = async (magentoDirName: string) => {
  const options = {
    cwd: magentoDirName,
    shell: true
  };

  return new Promise((resolve, reject) => {
    const sampleData = spawn(
      'bin/magento sampledata:deploy && bin/magento setup:upgrade',
      options
    );

    startLoggingProgress('Deploying sample data for Magento 2');
    sampleData.stderr.on('data', (data) => {
      logSimpleWarningMessage(data.toString());
    });

    sampleData.on('close', (code) => {
      if (code === 0) {
        stopLoggingProgressSuccess('Sample data deployed successfully');
        CliUx.ux.wait(500);
        resolve(1);
      } else {
        stopLoggingProgressError('Sample data deployment failed');
        reject();
      }
    });
  });
};

export default handleSampleData;
