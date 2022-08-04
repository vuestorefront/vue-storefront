import { LinkField, LinkType } from 'src/modules/vsf-storyblok-module';
import config from 'config';
import get from 'lodash-es/get';

import isUrlExternal from './is-url-external';

export default function getUrlFromLink (
  link: LinkField,
  storeCode?: string
): string {
  const formatUrl = (url: string): string => {
    if (isUrlExternal(url)) {
      return url;
    }

    if (url.startsWith('#')) {
      return url;
    }

    return (`/${url}`).replace(/^\/+/, '/');
  };

  if (link.linktype === LinkType.EMAIL) {
    return 'mailto:' + link.url;
  }

  const url = formatUrl(link.cached_url || link.url);

  const addStoreCode = get(config, 'storyblok.settings.appendStoreCodeFromHeader');
  if (addStoreCode && storeCode && url.startsWith(`/${storeCode}/`)) {
    return url.replace(`/${storeCode}/`, '/')
  }

  return url
}
