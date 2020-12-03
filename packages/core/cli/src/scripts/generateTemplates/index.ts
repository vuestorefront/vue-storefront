import getIntegrations from '../../utils/getIntegrations';
import createProject from '../createProject';
import path from 'path';

const generateTemplatesScript = async () => {
  for (const integration of getIntegrations()) {
    await createProject(integration, path.resolve('./templates', integration));
  }
};

generateTemplatesScript();
export default generateTemplatesScript;
