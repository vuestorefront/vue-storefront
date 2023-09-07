import execa from "execa";

const checkExistingDockerContainers = async (magentoDirName = "server") => {
  const execaFunc =
    process.platform === "darwin"
      ? execa("docker", ["container", "ls", "--format", "{{.Names}}"])
      : execa("sudo", ["docker", "container", "ls", "--format", "{{.Names}}"]);

  const { stdout } = await execaFunc;

  const isExistingDockerContainers = stdout.includes(magentoDirName);

  return isExistingDockerContainers;
};

export default checkExistingDockerContainers;
