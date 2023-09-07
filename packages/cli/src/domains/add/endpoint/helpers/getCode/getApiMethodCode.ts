export const getApiMethodCode = (
  endpoint: string
) => `import { Endpoints } from '../../types';

export const ${endpoint}: Endpoints['${endpoint}'] = async (
  context,
  params
) => {
  console.log('${endpoint} has been called');

  return { data: 'Hello from ${endpoint} endpoint!' };
};
`;
