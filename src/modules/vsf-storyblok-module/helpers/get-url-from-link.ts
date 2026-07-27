import get from 'lodash-es/get';

import config from 'config';
import { LinkField, LinkType } from 'src/modules/vsf-storyblok-module';

import isUrlExternal from './is-url-external';

function removeDomainFromUrl (url: string, host: string): string {
  const protocol = 'https://';

  return url.replace(`${protocol}${host}`, '');
}

export default function getUrlFromLink (
  link: LinkField,
  host: string,
  storeCode?: string
): string {
  const formatUrl = (url: string): string => {
    url = removeDomainFromUrl(url, host);

    if (isUrlExternal(url)) {
      return url;
    }

    if (url.startsWith('#')) {
      return url;
    }

    if (url.startsWith('tel:')) {
      return url;
    }

    let anchorPart = '';

    if (link.anchor) {
      anchorPart = '#' + link.anchor;
    }

    return (`/${url}`).replace(/^\/+/, '/') + anchorPart;
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
