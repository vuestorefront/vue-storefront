import execa from 'execa';

const checkExistingDockerContainers = async (magentoDirName = 'server') => {
  const { stdout } = await execa('docker', [
    'container',
    'ls',
    '--format',
    '{{.Names}}'
  ]);

  const isExistingDockerContainers = stdout.includes(magentoDirName);

  return isExistingDockerContainers;
};

export default checkExistingDockerContainers;
