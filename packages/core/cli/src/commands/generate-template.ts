import { vsfTuConfig } from '../utils/themeUtilsConfigTemplate';
import { createTemplate } from '../scripts/createTemplate/createTemplate';
import log from '../utils/log';
const process = require('process');
const path = require('path');

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
  const generatedTemplatePath = path.join(process.cwd(), outputPathName);
  const vsfTuConfiguration = vsfTuConfig({
    outputPathName,
    themePath: integrationThemePath,
    _themePath: path.join(integrationThemePath, '_theme')
  });

  await (async () => {
    try {
      await createTemplate({ vsfTuConfiguration, generatedTemplatePath });
    } catch (error) {
      log.error('Error during creating template');
    }
  })();
};
