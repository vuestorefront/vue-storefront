import execa from 'execa';

const checkIfStdoutIsVersion = (stdout: string) => {
  const versionRegex = /^\d+\.\d+\.\d+$/;

  return versionRegex.test(stdout);
};

const checkDocker = async (): Promise<boolean> => {
  const { stdout } = await execa('docker', ['version', '--format', '{{.Server.Version}}']);

  return checkIfStdoutIsVersion(stdout);
};

export default checkDocker;
