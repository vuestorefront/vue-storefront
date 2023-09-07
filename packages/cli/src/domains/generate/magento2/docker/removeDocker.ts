import { spawn } from "child_process";
import fs from "fs";

// rewrite with exec
const removeDockerContainer = async (magentoDirName: string): Promise<any> => {
  const options = {
    cwd: magentoDirName,
  };

  return new Promise(() => {
    const removeDocker = spawn("docker-compose", ["rm", "-f"], options);

    removeDocker.on("exit", () => {
      fs.rmdirSync(magentoDirName, { recursive: true });
    });
  });
};

export default removeDockerContainer;
