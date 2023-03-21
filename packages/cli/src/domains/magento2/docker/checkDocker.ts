import { spawn } from 'child_process';
import {
  logSimpleErrorMessage,
  logSimpleInfoMessage,
  simpleLog
} from '../functions/terminalHelpers';

/** Checking if Docker is installed and running on user's machine */
const checkDocker = async (): Promise<void> => {
  const docker =
    process.platform === 'darwin'
      ? spawn('docker', ['info'])
      : spawn('sudo', ['docker', 'info']);

  docker.stderr.on('data', (data) => {
    simpleLog(data.toString());
  });

  const isDockerInstalled = await new Promise((resolve) => {
    docker.on('close', (code) => resolve(code === 0));
  });

  if (!isDockerInstalled) {
    logSimpleErrorMessage(
      'Docker is not installed or not running. Please make sure that prerequisites are complied with and run command again. For more information, please visit https://docs.vuestorefront.io/magento/installation-setup/configure-magento.html'
    );
    process.exit(1);
  } else {
    logSimpleInfoMessage('🐳 Docker is installed and running.');
  }
};

export default checkDocker;
