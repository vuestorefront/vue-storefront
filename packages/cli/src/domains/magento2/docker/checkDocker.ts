import execa from 'execa';

const checkDocker = async () => {
  const { stdout } = await execa('docker', ['version', '--format', '{{.Server.Version}}']);

  return stdout;
};

export default checkDocker;
