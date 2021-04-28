import { vsfTuConfig } from '../utils/themeUtilsConfigTemplate';
import { createTemplate } from '../scripts/createTemplate/createTemplate';
const process = require('process');
const path = require('path');
const fs = require('fs');

export default async (args) => {
  if (!args[0]) {
    console.error('Error: No output folder provided');
    process.exit(1);
  }

  const outputPathName: string = args[0].toLowerCase();
  const integrationThemePath: string | undefined = args[1]
    ? path.resolve(args[1])
    : process.cwd();
  const vsfTuConfigFileName = 'theme-utils.config.js';
  const vsfTuConfigFilePath = path.join(process.cwd(), vsfTuConfigFileName);
  const generatedTemplatePath = path.join(process.cwd(), outputPathName);

  const createVsfTuConfigFile = () => {
    if (fs.existsSync(vsfTuConfigFilePath)) {
      fs.unlinkSync(vsfTuConfigFilePath);
    }

    fs.appendFile(
      vsfTuConfigFilePath,
      vsfTuConfig({
        outputPathName,
        themePath: integrationThemePath,
        _themePath: path.join(integrationThemePath, '_theme')
      }),
      async (err) => {
        if (err) throw err;
        await createTemplate({ vsfTuConfigFilePath, generatedTemplatePath });
      }
    );
  };

  createVsfTuConfigFile();
};
