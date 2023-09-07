import fs from "fs";
import { confirm, intro } from "@clack/prompts";
import picocolors from "picocolors";
import { writeApiMethod, writeSDKMethod, writePageMethod } from "./helpers";
import { log } from "../../../utils/log";

export const makeMethod = async (name: string) => {
  const apiMethodPath = `./packages/api-client/src/api/${name}`;
  const endpointExists = fs.existsSync(apiMethodPath);
  let isOverwrite = false;

  if (endpointExists) {
    log(`Endpoint ${name} already exists`);

    const shouldOverwrite = await confirm({
      message: `Do you want to overwrite ${name} enpoint?`,
    });

    if (!shouldOverwrite) {
      log("Endpoint was not created");
      process.exit(0);
    }

    isOverwrite = true;
  }

  await writeApiMethod(name, isOverwrite);
  await writeSDKMethod(name, isOverwrite);
  await writePageMethod(name);

  intro(`Endpoint ${name} has been created`);
  log("Files created:");
  log(`- packages/api-client/src/api/${name}`);
  log(`- packages/sdk/src/methods/${name}`);
  log("Files updated:");
  log("- packages/api-client/src/api/index.ts");
  log("- packages/sdk/src/methods/index.ts");
  log("- packages/api-client/src/types/api/endpoints.ts");
  log(
    `Run ${picocolors.green(
      "build"
    )} command to build the project and ${picocolors.green(
      "dev"
    )} command to start the playground again`
  );
};
