import { Config } from '../../types/setup';
import { isAnonymousSession, isUserSession } from '../utils';
declare const createCommerceToolsConnection: (settings: Config) => any;
export { isAnonymousSession, isUserSession, createCommerceToolsConnection };
