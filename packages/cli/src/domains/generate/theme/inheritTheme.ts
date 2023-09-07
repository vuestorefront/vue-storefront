import * as fs from "fs";
import * as path from "path";
import execa from "execa";
import processMagicComments from "./processMagicComments";
import { removeFileOrDirectory } from "../directory";

const VSF_TU_CONFIG_FILENAME = "theme-utils.config.js";

const NUXT_CONFIG_FILENAME = "nuxt.config.js";

type Options = {
  projectPath: string;
  integrationPath: string;
};

const inheritTheme = async (options: Options) => {
  const { integrationPath, projectPath } = options;

  const configPath = path.join(integrationPath, VSF_TU_CONFIG_FILENAME);

  await fs.promises.writeFile(
    configPath,
    `module.exports = {
  copy: {
    to: '${projectPath}',
    from: [
      {
        path: '${path.join(integrationPath, "_theme")}',
        watch: false
      },
      {
        path: '${integrationPath}',
        ignore: ['generate-template.ts', 'theme-utils.config.js'],
        variables: {},
        watch: false
      }
    ]
  }
};
`
  );

  await execa(require.resolve("@vue-storefront/theme-utilities"), [
    "--config",
    configPath,
    "--output",
    projectPath,
  ]);

  await removeFileOrDirectory(configPath);

  await processMagicComments(path.join(projectPath, NUXT_CONFIG_FILENAME));

  await removeFileOrDirectory(path.join(projectPath, "_theme"));
};

export default inheritTheme;
