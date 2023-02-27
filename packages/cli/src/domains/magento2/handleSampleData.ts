import { spawn } from 'child_process';
import {
  startLoggingProgress,
  stopLoggingProgressError,
  stopLoggingProgressSuccess
} from './terminalHelpers';

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

    startLoggingProgress('🛍️ Deploying sample data for Magento 2');

    sampleData.on('close', (code) => {
      if (code === 0) {
        stopLoggingProgressSuccess('🎉 Sample data deployed successfully');
        resolve(1);
      } else {
        stopLoggingProgressError('😱 Sample data deployment failed');
        reject();
      }
    });
  });
};

export default handleSampleData;
