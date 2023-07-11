import type Integration from './Integration';
import fetch from 'node-fetch-native';

const API_URL = 'https://raw.githubusercontent.com/vuestorefront/cli-integrations/main/data.json';

const fetchIntegrations = async (): Promise<Integration[]> => {
  const response = await fetch(API_URL);
  return await response.json();
};

export default fetchIntegrations;
