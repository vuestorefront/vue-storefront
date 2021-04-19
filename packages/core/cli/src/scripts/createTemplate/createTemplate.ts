import { processTemplate } from './processTemplate';
import log from '../../utils/log';

interface ICreateTemplateProps {
  vsfTuConfigFilePath: string;
  generatedTemplatePath: string;
}

export const createTemplate = async ({
  vsfTuConfigFilePath,
  generatedTemplatePath
}: ICreateTemplateProps) => {
  try {
    await processTemplate({ vsfTuConfigFilePath, generatedTemplatePath });
    log.success('Template generated');
  } catch (error) {
    log.error('Template not generated');
    process.exit(1);
  }
};
