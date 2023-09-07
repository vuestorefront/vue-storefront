import fs from "fs";
import { writeToTypescriptFile } from "..";
import { getApiMethodCode } from "../getCode/getApiMethodCode";

export const writeApiMethod = async (
  endpoint: string,
  isOverwrite: boolean
) => {
  const apiMethodPath = `./packages/api-client/src/api/${endpoint}`;
  const typesMethodPath = "./packages/api-client/src/types/api/endpoints.ts";
  const ifFileExists = fs.existsSync(apiMethodPath);

  if (ifFileExists && isOverwrite) {
    fs.rmSync(apiMethodPath, { recursive: true });
  }

  if (!ifFileExists) {
    fs.appendFileSync(
      "./packages/api-client/src/api/index.ts",
      `\nexport { ${endpoint} } from './${endpoint}';`
    );
  }

  fs.mkdirSync(apiMethodPath, { recursive: true });
  fs.writeFileSync(`${apiMethodPath}/index.ts`, getApiMethodCode(endpoint));
  writeToTypescriptFile(typesMethodPath, endpoint);
};
