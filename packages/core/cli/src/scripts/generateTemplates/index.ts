import getIntegrations from '../../utils/getIntegrations';
import createProject from '../createProject';
import path from 'path';

(async () => {
  const integrationTemplatesDirectory = path.resolve('./templates');
  for (const [integration, repositoryLink] of Object.entries(
    getIntegrations()
  )) {
    await createProject({
      integration,
      targetPath: integrationTemplatesDirectory,
      repositoryLink
    });
  }
})();
