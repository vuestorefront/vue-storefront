import omit from 'lodash/omit';

export default config => {
  const purgeConfig = (config.purgeConfig || []).slice();

  config = omit(config, purgeConfig);
  delete config['purgeConfig'];

  return config;
}
