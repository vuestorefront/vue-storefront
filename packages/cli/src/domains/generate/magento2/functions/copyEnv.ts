import fs from "fs";
import picocolors from "picocolors";
import path from "path";
import { simpleLog } from "./terminalHelpers";

const copyEnv = async (vsfDirName: string, magentoDomain?: string) => {
  try {
    await fs.copyFileSync(
      path.join(vsfDirName, ".env.example"),
      path.join(vsfDirName, ".env")
    );

    if (magentoDomain) {
      const envFile = await fs.readFileSync(
        path.join(vsfDirName, ".env"),
        "utf8"
      );

      const result = envFile.replace(
        /{YOUR_SITE_FRONT_URL}/g,
        magentoDomain.replace(/\/$/, "")
      );

      fs.writeFileSync(path.join(vsfDirName, ".env"), result, "utf8");
    }
  } catch (error) {
    simpleLog(
      "No .env file available. Please check that your git repository is a valid Vue Storefront project",
      picocolors.red
    );
    process.exit(1);
  }

  fs.unlinkSync(path.join(vsfDirName, ".env.example"));
};

export default copyEnv;
