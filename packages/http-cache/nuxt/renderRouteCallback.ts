import isUrlMatchingRule from './isUrlMatchingRule';
import { HttpCacheModuleParams } from './types';

const renderRouteCallback = ({ default: defaultHeaderValue = 'max-age=60', matchRoute = {} }: HttpCacheModuleParams) => (url, result, { res }): void => {
  if (res.headersSent) return;
  res.setHeader('Cache-Control', defaultHeaderValue);

  Object.entries(matchRoute).map(([rule, headerValue]: [string, string]): void => {
    if (!isUrlMatchingRule(url, rule)) return;

    if (headerValue === 'none') {
      res.removeHeader('Cache-Control');
      return;
    }

    res.setHeader('Cache-Control', headerValue);
  });
};

export default renderRouteCallback;
