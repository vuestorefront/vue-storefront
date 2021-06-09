import { processTemplate } from './processTemplate';
import log from '../../utils/log';
import { VsfTuConfiguration } from '../../utils/themeUtilsConfigTemplate';

interface ICreateTemplateProps {
  vsfTuConfiguration: VsfTuConfiguration;
  generatedTemplatePath: string;
}

export const createTemplate = async ({
  vsfTuConfiguration,
  generatedTemplatePath
}: ICreateTemplateProps) => {
  try {
    await processTemplate({ vsfTuConfiguration, generatedTemplatePath });
    log.success('Template generated');
  } catch (error) {
    log.error('Template not generated');
    process.exitCode = 1;
  }
};
