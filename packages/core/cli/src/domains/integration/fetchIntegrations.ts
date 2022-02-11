import type Integration from './Integration';

const fetchIntegrations = async (): Promise<Integration[]> => {
  const { default: integrations } = await import('./integrations.json');

  return integrations;
};

export default fetchIntegrations;
