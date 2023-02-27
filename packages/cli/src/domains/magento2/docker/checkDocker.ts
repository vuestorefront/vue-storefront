import { spawn } from 'child_process';
import {
  logSimpleErrorMessage,
  logSimpleInfoMessage,
  logSimpleSuccessMessage,
  simpleLog
} from '../terminalHelpers';

// const checkIfStdoutIsVersion = (stdout: string) => {
//   stdout = stdout.trim();
//   const versionRegex = /^(\d+\.)?(\d+\.)?(\*|\d+)$/;

//   return versionRegex.test(stdout);
// };

const checkDocker = async (): Promise<void> => {
  logSimpleInfoMessage('🔍 Checking if Docker is installed...');
  const docker = spawn('docker', ['info']);

  let isDockerInstalled = false;

  docker.stderr.on('data', (data) => {
    simpleLog(data.toString());
  });

  await new Promise((resolve) => {
    docker.on('close', (code) => {
      if (code === 0) {
        isDockerInstalled = true;
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });

  if (!isDockerInstalled) {
    logSimpleErrorMessage(
      'Docker is not installed or not running. Please make sure that prerequisites are complied with and run command again. For more information, please visit https://docs.vuestorefront.io/magento/installation-setup/configure-magento.html'
    );
    process.exit(1);
  } else {
    logSimpleSuccessMessage(
      'Docker is installed and running. Proceeding with Magento 2 installation...'
    );
  }
};

export default checkDocker;
