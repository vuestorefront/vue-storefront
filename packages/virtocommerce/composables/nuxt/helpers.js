import defaultConfig from '@vue-storefront/virtocommerce/nuxt/defaultConfig';

export const mapConfigToSetupObject = ({ moduleOptions, additionalProperties = {} }) => {
  return {
    ...defaultConfig,
    ...moduleOptions,
    ...additionalProperties
  };
};
