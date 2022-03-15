import isUrlMatchingRule from './isUrlMatchingRule';
import { CacheControlModuleParams } from './types';

const renderRouteCallback = ({ default: defaultHeaderValue = 'max-age=60', matchRoute = {}, blacklist = [] }: CacheControlModuleParams) => (url, result, { res }): void => {
  res.setHeader('Cache-Control', defaultHeaderValue);

  Object.entries(matchRoute).map(([rule, headerValue]: [string, string]): void => {
    isUrlMatchingRule(url, rule) && res.setHeader('Cache-Control', headerValue);
  });

  blacklist.map((rule: string): void => {
    isUrlMatchingRule(url, rule) && res.removeHeader('Cache-Control');
  });
};

export default renderRouteCallback;
