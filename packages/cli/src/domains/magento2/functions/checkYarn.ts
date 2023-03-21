import { spawn } from 'child_process';
import { logSimpleErrorMessage, simpleLog } from './terminalHelpers';

/** Checking if Docker is installed and running on user's machine */
const checkYarn = async (): Promise<void> => {
  const yarn = spawn('yarn', ['-v']);

  yarn.stderr.on('data', (data) => {
    simpleLog(data.toString());
  });

  const isDockerInstalled = await new Promise((resolve) => {
    yarn.on('close', (code) => resolve(code === 0));
  });

  if (!isDockerInstalled) {
    logSimpleErrorMessage(
      'Yarn is not installed. Please make sure that prerequisites are complied with and run command again.'
    );
    process.exit(1);
  }
};

export default checkYarn;
