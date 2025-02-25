import { spawn } from "child_process";
import fs from "fs";
import path from "path";

/** Copy auth.json file to Docker container */
const copyAuth = async (
  magentoDirName: string,
  accessKey: string,
  secretKey: string
) => {
  const options = {
    cwd: magentoDirName,
  };

  const authFile = await fs.readFileSync(
    path.join(magentoDirName, "src/auth.json.sample"),
    "utf-8"
  );

  await fs.writeFileSync(
    path.join(magentoDirName, "src/auth.json"),
    authFile
      .replace(/<public-key>/g, accessKey)
      .replace(/<private-key>/g, secretKey),
    "utf-8"
  );

  const copyToContainer = spawn(
    "bin/copytocontainer",
    ["src/auth.json"],
    options
  );

  copyToContainer.on("close", () => undefined);
};

export default copyAuth;
