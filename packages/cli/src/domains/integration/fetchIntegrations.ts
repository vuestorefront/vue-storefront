import type Integration from './Integration';
import fetch from 'node-fetch';

const API_URL = 'https://raw.githubusercontent.com/vuestorefront/cli-integrations/main/data.json';

const fetchIntegrations = async (): Promise<Integration[]> => {
  const response = await fetch(API_URL);
  return response.json() as Promise<Integration[]>;
};

export default fetchIntegrations;
