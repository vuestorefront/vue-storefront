import { TaskQueue } from '@vue-storefront/core/lib/sync';

const IP_RESOLVE_SERVICE_URL = 'get.geojs.io/v1/ip/country.json';

export default async function ipResolver (): Promise<string> {
  const { result, resultCode } = await TaskQueue.execute({
    IP_RESOLVE_SERVICE_URL,
    payload: {
      method: 'GET',
      silent: true
    }
  });

  if (resultCode !== 200) {
    throw new Error('Unable to resolve ip');
  }

  return result.ip;
}
