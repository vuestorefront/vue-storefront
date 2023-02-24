import { spawn } from 'child_process';
import { simpleLog } from '../terminalHelpers';

// const checkIfStdoutIsVersion = (stdout: string) => {
//   stdout = stdout.trim();
//   const versionRegex = /^(\d+\.)?(\d+\.)?(\*|\d+)$/;

//   return versionRegex.test(stdout);
// };

const checkDocker = async (): Promise<boolean> => {
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

  return isDockerInstalled;
};

export default checkDocker;
