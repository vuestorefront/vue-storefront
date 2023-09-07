import fs from "fs";
import { existsDirectory } from "../../../../../utils";
import { getNuxtPageCode } from "..";

export const writeNuxtPageMethod = async (endpoint: string) => {
  const nuxtPagesPath = "./playground/app/pages";

  const folderExists = await existsDirectory(nuxtPagesPath);

  if (!folderExists) {
    fs.mkdirSync(nuxtPagesPath, { recursive: true });
  }

  const ifPageExists = fs.existsSync(`${nuxtPagesPath}/${endpoint}.tsx`);

  if (ifPageExists) {
    fs.rmSync(`${nuxtPagesPath}/${endpoint}.tsx`, { recursive: true });
  }

  fs.writeFileSync(
    `${nuxtPagesPath}/${endpoint}.vue`,
    getNuxtPageCode(endpoint)
  );
};
