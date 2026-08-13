import get from 'lodash-es/get';

import config from 'config';
import LinkField from '../types/link-field.interface';
import { LinkType } from '../types/link-type.value';

import isUrlExternal from './is-url-external';
import { resolveStoryblokAssetUrl } from './storyblok-asset-url';

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
    const resolvedAssetUrl = resolveStoryblokAssetUrl(url);

    if (resolvedAssetUrl !== url) {
      return resolvedAssetUrl;
    }

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
