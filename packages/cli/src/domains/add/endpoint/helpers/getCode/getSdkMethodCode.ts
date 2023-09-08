export const getSDKMethodCode = (
  endpoint: string
) => `import { client } from '../../client';
import { TODO } from '../../types';

/**
 * Method summary - General information about the SDK method, usually a single sentence.
 * 
 * @remarks
 * In this section, we have been adding detailed information such as:
 * * what API middleware endpoint this method is calling,
 * * what SAP OCC API endpoints are being called as a result of using this method,
 * * when this method can be used and when it can’t (e.g. logged-in vs anonymous users),
 * * simply everything what helps with understanding how it works.
 * 
 * @param props
 * Just like our API methods, our SDK connector methods accept a single props parameter which carries relevant sub-properties. Therefore, there isn’t much to be described within that TSDoc section.
 * 
 * @returns
 * Human-friendly information what the SDK methods returns.
 * 
 * @example
 * A short code snippet showing how to use the method. Usually we have more than one @example. We should strive for adding as many examples as possible here, with multiple param configurations.
 */
export async function ${endpoint}(props: TODO) {
  const { data } = await client.post<TODO>('${endpoint}', props);
  return data
}
`;
