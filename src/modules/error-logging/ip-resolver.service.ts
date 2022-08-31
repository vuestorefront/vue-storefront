const IP_RESOLVE_SERVICE_URL = 'https://get.geojs.io/v1/ip/country.json';

export default async function ipResolver (): Promise<string> {
  const response = await fetch(
    IP_RESOLVE_SERVICE_URL,
    {
      method: 'GET'
    }
  );

  if (response.status !== 200) {
    throw new Error('Unable to resolve ip');
  }

  const responseData = await response.json()

  return responseData.ip;
}
