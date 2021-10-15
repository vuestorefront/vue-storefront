import axios from 'axios';

type Integrations = Record<string, {
  git: string,
  docs: string,
}>;

export const fetchIntegrations = async (): Promise<Integrations> => {
  const payload = {
    token: 'hbNAEulFzBd9c8KYpaeWTg',
    data: {
      Commercetools: {
        git: 'https://github.com/vuestorefront/template-commercetools.git',
        docs: 'https://docs.vuestorefront.io/v2/commercetools/'
      },
      'Salesforce Commerce Cloud (beta)': {
        git: 'https://github.com/ForkPoint/vsf-sfcc-template.git',
        docs: 'https://docs.vuestorefront.io/sfcc/'
      },
      Shopify: {
        git: 'https://github.com/vuestorefront/template-shopify.git',
        docs: 'https://docs.vuestorefront.io/shopify/'
      },
      'Spryker (beta)': {
        git: 'https://github.com/spryker/vsf-theme.git',
        docs: 'https://spryker-vsf-docs.web.app/'
      },
      'Magento 2 (beta)': {
        git: 'https://github.com/vuestorefront/template-magento.git',
        docs: 'https://docs.vuestorefront.io/magento/'
      },
      'Vendure (beta)': {
        git: 'https://github.com/vuestorefront/template-vendure.git',
        docs: 'https://docs.vuestorefront.io/vendure/'
      }
    }
  };

  const {data} = await axios({
    method: 'post',
    url: 'https://app.fakejson.com/q',
    data: payload
  });

  return data as Integrations;
};
