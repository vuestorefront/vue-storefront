import fs from "fs";
import { existsDirectory } from "../../../../../utils";
import { getNextPageCode } from "..";

export const writeNextPageMethod = async (endpoint: string) => {
  const nextPagesPath = "./playground/app/src/pages/methods";

  const folderExists = await existsDirectory(nextPagesPath);

  if (!folderExists) {
    fs.mkdirSync(nextPagesPath, { recursive: true });
  }

  const ifPageExists = fs.existsSync(`${nextPagesPath}/${endpoint}.tsx`);

  if (ifPageExists) {
    fs.rmSync(`${nextPagesPath}/${endpoint}.tsx`, { recursive: true });
  }

  fs.writeFileSync(
    `${nextPagesPath}/${endpoint}.tsx`,
    getNextPageCode(endpoint)
  );
};
