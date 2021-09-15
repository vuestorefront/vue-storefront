import log from '../../utils/log';
import { processMagicCommentsInNuxtConfig } from './processMagicCommentsInNuxtConfig';
import { removeFolder } from '../../utils/removeFolder';
const execa = require('execa');
const fs = require('fs');

interface IProcessTemplateProps {
  vsfTuConfigFilePath: string;
  generatedTemplatePath: string;
}

export const processTemplate = async ({
  vsfTuConfigFilePath,
  generatedTemplatePath
}: IProcessTemplateProps) => {
  try {
    await execa('vsf-tu');
  } catch (error) {
    log.error('Unprocessable template');
    process.exitCode = 1;
  }

  try {
    const removeVsfTuConfigFile = () => fs.unlinkSync(vsfTuConfigFilePath);
    removeVsfTuConfigFile();
  } catch (error) {
    log.error('Can\'t remove VSF-TU config file');
  }

  await processMagicCommentsInNuxtConfig(generatedTemplatePath);

  try {
    removeFolder(generatedTemplatePath, '_theme');
  } catch (error) {
    log.error('Fail to remove _theme folder');
  }
};
