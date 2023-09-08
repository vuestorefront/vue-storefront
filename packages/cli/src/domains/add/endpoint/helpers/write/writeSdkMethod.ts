import fs from "fs";
import { getSDKMethodCode } from "..";

export const writeSDKMethod = async (
  endpoint: string,
  isOverwrite: boolean
) => {
  const sdkMethodPath = `./packages/sdk/src/methods/${endpoint}`;
  const isFileExist = fs.existsSync(sdkMethodPath);

  if (isFileExist && isOverwrite) {
    fs.rmSync(sdkMethodPath, { recursive: true });
  }

  if (!isFileExist) {
    fs.appendFileSync(
      "./packages/sdk/src/methods/index.ts",
      `\nexport { ${endpoint} } from './${endpoint}';`
    );
  }
  fs.mkdirSync(sdkMethodPath, { recursive: true });
  fs.writeFileSync(`${sdkMethodPath}/index.ts`, getSDKMethodCode(endpoint));
};
