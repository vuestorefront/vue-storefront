import { vsfTuConfig } from '../utils/themeUtilsConfigTemplate';
import { createTemplate } from '../scripts/createTemplate/createTemplate';
import log from '../utils/log';
const process = require('process');
const path = require('path');
const fs = require('fs');

export default async (args) => {
  if (!args[0]) {
    log.error('Error: No output folder provided');
    process.exitCode = 1;
    return;
  }

  const outputPathName: string = args[0].toLowerCase();
  const integrationThemePath: string | undefined = args[1]
    ? path.resolve(args[1])
    : process.cwd();
  const vsfTuConfigFileName = 'theme-utils.config.js';
  const vsfTuConfigFilePath = path.join(process.cwd(), vsfTuConfigFileName);
  const generatedTemplatePath = path.join(process.cwd(), outputPathName);

  const crateTemplateCallback = async (err) => {
    try {
      if (err) throw err;
      await createTemplate({ vsfTuConfigFilePath, generatedTemplatePath });
    } catch (error) {
      log.error('Error during VSF theme utils config file creation');
    }
  };

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
      async (err) => await crateTemplateCallback(err)
    );
  };

  createVsfTuConfigFile();
};
