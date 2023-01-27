import { spawn } from 'child_process';
import picocolors from 'picocolors';
import fs from 'fs';

// rewrite with exec
const removeDockerContainer = async (magentoDirName: string, self: any): Promise<any> => {
  const options = {
    cwd: magentoDirName
  };

  return new Promise(() => {
    const removeDocker = spawn('docker-compose', ['rm', '-f'], options);

    removeDocker.stdout.on('data', (data) => {
      self.log(data.toString());
    });

    removeDocker.stderr.on('data', (data) => {
      self.log(data.toString());
    });

    removeDocker.on('exit', (code) => {
      self.log(picocolors.bgGreen(`Docker container removed with code ${code}.`));

      fs.rmdirSync(magentoDirName, { recursive: true });

      process.exit(1);
    });
  });
};

export default removeDockerContainer;

