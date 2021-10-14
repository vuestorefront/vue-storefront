import axios from 'axios';

export const fetchIntegrations = async (): Promise<Record<string, string>> => {
  const payload = {
    token: 'hbNAEulFzBd9c8KYpaeWTg',
    data: {
      Commercetools: 'https://github.com/vuestorefront/template-commercetools.git',
      'Salesforce Commerce Cloud (beta)': 'https://github.com/ForkPoint/vsf-sfcc-template.git',
      Shopify: 'https://github.com/vuestorefront/template-shopify.git',
      'Spryker (beta)': 'https://github.com/spryker/vsf-theme.git',
      'Magento 2 (beta)': 'https://github.com/vuestorefront/template-magento.git',
      'Vendure (beta)': 'https://github.com/vuestorefront/template-vendure.git'
    }
  };

  const {data} = await axios({
    method: 'post',
    url: 'https://app.fakejson.com/q',
    data: payload
  });

  return data as Record<string, string>;
};
