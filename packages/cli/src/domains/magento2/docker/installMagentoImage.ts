// import execa from 'execa';
import { spawn } from 'child_process';
import picocolors from 'picocolors';
import removeDockerContainer from './removeDocker';

// rewrite with exec
const installMagentoImage = async (magentoDirName: string, magentoDomainName: string, self: any): Promise<any> => {
  // const command = `curl -s https://raw.githubusercontent.com/markshust/docker-magento/master/lib/onelinesetup | bash -s -- ${magentoDomainName} 2.4.4`;
  const options = {
    cwd: magentoDirName
  };

  return new Promise((resolve) => {
    const curl = spawn('curl', ['-s', 'https://raw.githubusercontent.com/markshust/docker-magento/master/lib/onelinesetup'], options);
    const bash = spawn('bash', ['-s', '--', magentoDomainName, '2.4.4'], options);

    curl.stdout.pipe(bash.stdin);

    bash.stdout.on('data', (data) => {
      self.log(data.toString());
    });

    bash.stderr.on('data', async (data) => {
      self.log(data.toString());

      if (data.toString().includes('port is already allocated')) {
        self.log(picocolors.red('Port is already in use. Please stop the container and try again.'));
        // delete the directory

        await removeDockerContainer(magentoDirName, self);
      }
    });

    bash.on('exit', (code) => {
      self.log(picocolors.green('Magento 2 Docker image installed successfully'));
      resolve(code);
    });
  });
};

export default installMagentoImage;

