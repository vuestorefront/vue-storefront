import getIntegrations from '../../utils/getIntegrations';
import createProject from '../createProject';
import path from 'path';

(async () => {
  for (const integration of getIntegrations()) {
    await createProject(integration, path.resolve('./templates', integration));
  }
})();
