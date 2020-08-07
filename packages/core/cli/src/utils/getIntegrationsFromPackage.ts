import path from 'path';
import fs from 'fs';

const notAnIntegration = [
  'boilerplate',
  'nuxt'
];

const getIntegrationNameFromPackageName = (packageName: string): string => {
  const resolved = /@vue-storefront\/(.*?)-theme/.exec(packageName);
  return resolved && resolved[1];
};

export default (): string[] => {

  const { dependencies } = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf-8'));
  const integrations = Object.keys(dependencies)
    .map(getIntegrationNameFromPackageName)
    .filter(integration => integration)
    .filter(integration => !notAnIntegration.includes(integration));

  return integrations;
};
