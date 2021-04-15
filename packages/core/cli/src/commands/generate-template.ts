const process = require('process');
const path = require('path');
const fs = require('fs');
const execa = require('execa');
import log from '../utils/log';

import { vsfTuConfig } from '../utils/themeUtilsConfigTemplate';

export default async (args) => {
  if (!args[0]) {
    console.error('Error: No output folder provided');
    process.exit(1);
  }

  const outputPathName: string = args[0].toLowerCase();
  const integrationThemePath: string | undefined = args[1];
  const configFileName = 'theme-utils.config.js';

  if (fs.existsSync(path.join(process.cwd(), configFileName))) {
    fs.unlinkSync(path.join(process.cwd(), configFileName));
  }

  fs.appendFile(path.join(process.cwd(), configFileName), vsfTuConfig(outputPathName, integrationThemePath), async (err) => {
    if (err) throw err;

    try {
      await execa('vsf-tu');
      fs.unlinkSync('theme-utils.config.js');
      log.success('Template generated');
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });
};
