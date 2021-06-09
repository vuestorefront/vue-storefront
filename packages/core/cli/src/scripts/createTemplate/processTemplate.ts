import log from '../../utils/log';
import { processMagicCommentsInNuxtConfig } from './processMagicCommentsInNuxtConfig';
import { removeFolder } from '../../utils/removeFolder';
import { generate } from '@vue-storefront/theme-utilities';
import { VsfTuConfiguration } from '../../utils/themeUtilsConfigTemplate';
const fs = require('fs');

interface IProcessTemplateProps {
  vsfTuConfiguration: VsfTuConfiguration;
  generatedTemplatePath: string;
}

export const processTemplate = async ({
  vsfTuConfiguration,
  generatedTemplatePath
}: IProcessTemplateProps) => {
  try {
    await generate(vsfTuConfiguration);
  } catch (error) {
    log.error('Unprocessable template');
    process.exitCode = 1;
  }

  await processMagicCommentsInNuxtConfig(generatedTemplatePath);

  try {
    removeFolder(generatedTemplatePath, '_theme');
  } catch (error) {
    log.error('Fail to remove _theme folder');
  }
};
