import get from 'lodash-es/get';

import config from 'config';

const DEFAULT_STORYBLOK_ASSET_CDN_ORIGIN = 'https://sb-assets.budsies.com';
const STORYBLOK_ASSET_HOST = 'a.storyblok.com';
const LEGACY_STORYBLOK_ASSET_HOST = 's3.amazonaws.com';
const LEGACY_STORYBLOK_PATH_PREFIX = `/${STORYBLOK_ASSET_HOST}`;
const NETWORK_URL_PATTERN = /^(https?):\/\/([^/?#]+)([^?#]*)(\?[^#]*)?(#.*)?$/i;
const NETWORK_URL_AUTHORITY_PATTERN = /^([a-z0-9.-]+)(?::(\d+))?$/i;

export interface StoryblokAssetLocation {
  pathname: string,
  search: string,
  hash: string
}

interface ParsedStoryblokAsset {
  location: StoryblokAssetLocation,
  cdnOrigin: string,
  isCdnUrl: boolean
}

interface ParsedNetworkUrl extends StoryblokAssetLocation {
  origin: string,
  hostname: string
}

function getStoryblokAssetCdnOrigin (): string {
  return get(config, 'storyblok.assetCdnOrigin', DEFAULT_STORYBLOK_ASSET_CDN_ORIGIN);
}

function parseNetworkUrl (value: string): ParsedNetworkUrl | undefined {
  const match = NETWORK_URL_PATTERN.exec(value);

  if (!match) {
    return;
  }

  const [, rawProtocol, rawAuthority, pathname = '', search = '', hash = ''] = match;
  const authorityMatch = NETWORK_URL_AUTHORITY_PATTERN.exec(rawAuthority);

  if (!authorityMatch) {
    return;
  }

  const protocol = rawProtocol.toLowerCase();
  const hostname = authorityMatch[1].toLowerCase();
  const port = authorityMatch[2];
  const isDefaultPort = (protocol === 'http' && port === '80') ||
    (protocol === 'https' && port === '443');
  const normalizedPort = port && !isDefaultPort ? `:${port}` : '';

  return {
    origin: `${protocol}://${hostname}${normalizedPort}`,
    hostname,
    pathname: pathname || '/',
    search,
    hash
  };
}

function parseStoryblokAsset (
  value: string,
  cdnOrigin: string
): ParsedStoryblokAsset | undefined {
  if (!/^https?:\/\//i.test(value) || !/^https?:\/\//i.test(cdnOrigin)) {
    return;
  }

  const parsedUrl = parseNetworkUrl(value);
  const parsedCdnOrigin = parseNetworkUrl(cdnOrigin);

  if (!parsedUrl || !parsedCdnOrigin) {
    return;
  }

  let pathname = parsedUrl.pathname;
  let isCdnUrl = false;

  if (parsedUrl.origin === parsedCdnOrigin.origin) {
    isCdnUrl = true;
  } else if (
    parsedUrl.hostname === LEGACY_STORYBLOK_ASSET_HOST &&
    pathname.startsWith(`${LEGACY_STORYBLOK_PATH_PREFIX}/`)
  ) {
    pathname = pathname.slice(LEGACY_STORYBLOK_PATH_PREFIX.length);
  } else if (parsedUrl.hostname !== STORYBLOK_ASSET_HOST) {
    return;
  }

  return {
    location: {
      pathname,
      search: parsedUrl.search,
      hash: parsedUrl.hash
    },
    cdnOrigin: parsedCdnOrigin.origin,
    isCdnUrl
  };
}

export function parseStoryblokAssetUrl (
  value: string,
  cdnOrigin = getStoryblokAssetCdnOrigin()
): StoryblokAssetLocation | undefined {
  return parseStoryblokAsset(value, cdnOrigin)?.location;
}

function buildAssetUrl (asset: ParsedStoryblokAsset, transformation = ''): string {
  const normalizedPath = asset.location.pathname.replace(/^\/+/, '');
  const normalizedTransformation = transformation
    ? `/${transformation.replace(/^\/+|\/+$/g, '')}`
    : '';

  return `${asset.cdnOrigin}/${normalizedPath}` +
    normalizedTransformation +
    asset.location.search +
    asset.location.hash;
}

export function resolveStoryblokAssetUrl (
  value: string,
  cdnOrigin = getStoryblokAssetCdnOrigin()
): string {
  const asset = parseStoryblokAsset(value, cdnOrigin);

  if (!asset || asset.isCdnUrl) {
    return value;
  }

  return buildAssetUrl(asset);
}

export function buildStoryblokImageUrl (
  value: string,
  transformation: string,
  cdnOrigin = getStoryblokAssetCdnOrigin()
): string {
  const asset = parseStoryblokAsset(value, cdnOrigin);

  if (!asset) {
    return value;
  }

  return buildAssetUrl(asset, transformation);
}
