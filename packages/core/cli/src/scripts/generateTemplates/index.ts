import getIntegrations from '@vue-storefront/cli/src/utils/getIntegrations';
import createProject from '@vue-storefront/cli/src/scripts/createProject';
import path from 'path';

const generateTemplatesScript = async () => {
  for (const integration of getIntegrations()) {
    await createProject(integration, path.resolve('./templates', integration));
  }
};

generateTemplatesScript();
