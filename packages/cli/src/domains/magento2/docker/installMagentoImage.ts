import { spawn } from 'child_process';
import removeDockerContainer from './removeDocker';
import {
  logSimpleErrorMessage,
  startLoggingProgress,
  stopLoggingProgressError,
  stopLoggingProgressSuccess,
  suspendLoggingProgressPrompt
} from '../terminalHelpers';

import { note } from '@clack/prompts';

// rewrite with exec
const installMagentoImage = async (
  magentoDirName: string,
  magentoDomainName: string
): Promise<any> => {
  // const command = `curl -s https://raw.githubusercontent.com/markshust/docker-magento/master/lib/onelinesetup | bash -s -- ${magentoDomainName} 2.4.4`;
  const options = {
    cwd: magentoDirName
  };

  return new Promise((resolve) => {
    const curl = spawn(
      'curl',
      [
        '-s',
        'https://raw.githubusercontent.com/markshust/docker-magento/master/lib/onelinesetup'
      ],
      options
    );
    const bash = spawn(
      'bash',
      ['-s', '--', magentoDomainName, '2.4.4'],
      options
    );

    note('This may take up to 10 minutes to complete. Please wait...🐌');

    startLoggingProgress('🔁 Installing Magento 2 Docker image');

    curl.stdout.pipe(bash.stdin);

    bash.stdout.on('data', (data) => {
      if (data.toString().includes('System password requested')) {
        suspendLoggingProgressPrompt('🙈 Please enter the password');
      }

      if (data.toString().includes('Restarting containers to apply updates')) {
        startLoggingProgress('🔁 Installing Magento 2 Docker image');
      }
    });

    bash.stderr.on('data', async (data) => {
      if (data.toString().includes('port is already allocated')) {
        logSimpleErrorMessage(
          '😞 Port is already in use. Please stop the container and try again.'
        );
        // delete the directory
        await removeDockerContainer(magentoDirName);
      }
    });

    bash.on('exit', (code) => {
      if (code === 0) {
        stopLoggingProgressSuccess(
          '🎉 Magento 2 Docker image installed successfully'
        );
        resolve(1);
      } else {
        stopLoggingProgressError(
          '😱 Magento 2 Docker image installation failed'
        );
      }
    });
  });
};

export default installMagentoImage;
