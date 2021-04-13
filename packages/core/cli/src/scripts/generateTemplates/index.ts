import getIntegrations from '../../utils/getIntegrations';
import createProject from '../createProject';
import path from 'path';

(async () => {
  const integrationTemplatesDirectory = path.resolve('./templates');
  for (const integration of Object.keys(getIntegrations())) {
    await createProject(integration, integrationTemplatesDirectory);
  }
})();
