import * as fs from "fs";

const existsDirectory = async (path: string): Promise<boolean> => {
  try {
    await fs.promises.access(path);

    const stats = await fs.promises.lstat(path);

    return stats.isDirectory();
  } catch {
    return false;
  }
};

export default existsDirectory;
