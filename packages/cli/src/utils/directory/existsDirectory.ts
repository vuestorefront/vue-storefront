import * as fs from "fs";

export const existsDirectory = async (path: string): Promise<boolean> => {
  try {
    await fs.promises.access(path);

    const stats = await fs.promises.lstat(path);

    return stats.isDirectory();
  } catch {
    return false;
  }
};
