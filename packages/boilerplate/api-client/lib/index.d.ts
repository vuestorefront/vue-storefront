import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import { ApiClientMethods, ApiClientSettings } from './types';
declare const setup: (config: ApiClientSettings) => void, override: (overrides: ApiClientMethods) => void;
declare const settings: ApiClientSettings;
export { getProduct, getCategory, override, setup, settings };
