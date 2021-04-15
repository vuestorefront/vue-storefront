import processMagicComments from '../scripts/createProject/processMagicComments';
import log from '../utils/log';
import { vsfTuConfig } from '../utils/themeUtilsConfigTemplate';
const process = require('process');
const path = require('path');
const fs = require('fs');
const execa = require('execa');

export default async (args) => {
  if (!args[0]) {
    console.error('Error: No output folder provided');
    process.exit(1);
  }

  const outputPathName: string = args[0].toLowerCase();
  const integrationThemePath: string | undefined = args[1];
  const configFileName = 'theme-utils.config.js';
  const configFilePath = path.join(process.cwd(), configFileName);
  const generatedTemplatePath = path.join(process.cwd(), outputPathName);

  if (fs.existsSync(configFilePath)) {
    fs.unlinkSync(configFilePath);
  }

  fs.appendFile(configFilePath, vsfTuConfig(outputPathName, integrationThemePath), async (err) => {
    if (err) throw err;

    try {
      await execa('vsf-tu');
      fs.unlinkSync(configFilePath);
      log.info('Updating Nuxt config');
      try {
        const nuxtConfigPath = path.join(generatedTemplatePath, 'nuxt.config.js');
        await processMagicComments(nuxtConfigPath);
      } catch (error) {
        log.error('No nuxt.config.js has been found in integration template');
        process.exit(1);
      }
      log.success('Template generated');
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });
};
