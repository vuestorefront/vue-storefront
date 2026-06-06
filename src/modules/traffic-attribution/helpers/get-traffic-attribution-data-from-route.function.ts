import config from 'config';
import { Route } from 'vue-router';

import { TrafficAttributionData } from '../types/traffic-attribution.interface';

const DEFAULT_ACQUISITION_CLICK_ID_KEYS = [
  'gclid',
  'gbraid',
  'wbraid',
  'dclid',
  'gad_source',
  'gad_campaignid',
  'msclkid',
  'fbclid',
  'ttclid',
  'li_fat_id',
  'twclid',
  'sccid',
  'epik',
  'rdt_cid',
  'srsltid',
  'irclickid',
  'sscid',
  'awc'
];

const DEFAULT_SENSITIVE_QUERY_KEYS = [
  'token',
  'auth_token',
  'access_token',
  'refresh_token',
  'id_token',
  'email',
  'user',
  'customer_id',
  'order_id',
  'order_item_id',
  'quote_id',
  'cart_id',
  'SID',
  'redirect',
  'redirect-target',
  'redirect_url',
  'return_url',
  'url',
  'uri',
  'dest',
  'target',
  'file',
  'image-url'
];

function getTrafficAttributionConfig (): any {
  return config.trafficAttribution || {};
}

function normalizeValue (value: undefined | null | string | (string | null)[]): string {
  if (!value) {
    return '';
  }

  let stringValue = Array.isArray(value)
    ? value.reduce<string>((acc, item) => {
      if (item) {
        return acc + `${item},`;
      }

      return acc;
    }, '')
    : value;

  if (stringValue.endsWith(',')) {
    stringValue = stringValue.slice(0, -1);
  }

  return stringValue;
}

function normalizeKeyList (keys: string[] = []): string[] {
  return keys
    .filter((key) => Boolean(key))
    .map((key) => key.toLowerCase());
}

function getConfiguredList (key: string, defaults: string[]): string[] {
  const configured = getTrafficAttributionConfig()[key];

  if (Array.isArray(configured)) {
    return configured;
  }

  return defaults;
}

export function normalizeTrafficAttributionQueryParams (query: Route['query']): Record<string, string> {
  const sensitiveKeys = normalizeKeyList(getConfiguredList('sensitiveQueryKeys', DEFAULT_SENSITIVE_QUERY_KEYS));
  const queryParams: Record<string, string> = {};

  Object.keys(query)
    .sort()
    .forEach((key) => {
      if (sensitiveKeys.indexOf(key.toLowerCase()) !== -1) {
        return;
      }

      const normalizedValue = normalizeValue(query[key]);

      if (normalizedValue) {
        queryParams[key] = normalizedValue;
      }
    });

  return queryParams;
}

function getReferrerUrl (): string {
  if (typeof document === 'undefined') {
    return '';
  }

  return document.referrer || '';
}

function getLandingPageUrl (): string {
  if (typeof window === 'undefined' || !window.location) {
    return '';
  }

  return `${window.location.origin}${window.location.pathname}`;
}

export function getTrafficAttributionDataFromRoute (route: Route): TrafficAttributionData | null {
  const landingPageUrl = getLandingPageUrl();

  if (!landingPageUrl) {
    return null;
  }

  const referrerUrl = getReferrerUrl();
  const attribution: TrafficAttributionData = {
    landing_page_url: landingPageUrl,
    query_params: normalizeTrafficAttributionQueryParams(route.query),
    detected_at: new Date().toISOString()
  };

  if (referrerUrl) {
    attribution.referrer_url = referrerUrl;
  }

  return attribution;
}

function isIgnoredReferrerHost (host: string, ignoredHosts: string[]): boolean {
  const normalizedHost = host.toLowerCase();

  return ignoredHosts.some((ignoredHost) => {
    const normalizedIgnoredHost = ignoredHost.toLowerCase();

    return normalizedHost === normalizedIgnoredHost ||
      normalizedHost.endsWith(`.${normalizedIgnoredHost}`);
  });
}

function hasUsableExternalReferrer (referrerUrl: string | undefined): boolean {
  if (!referrerUrl) {
    return false;
  }

  try {
    const referrerHost = new URL(referrerUrl).hostname;
    const currentHost = typeof window !== 'undefined' && window.location
      ? window.location.hostname
      : '';
    const ignoredHosts = getConfiguredList('ignoredReferrerHosts', []);

    if (currentHost && referrerHost.toLowerCase() === currentHost.toLowerCase()) {
      return false;
    }

    return !isIgnoredReferrerHost(referrerHost, ignoredHosts);
  } catch (e) {
    return false;
  }
}

export function hasTrafficAttributionAcquisitionSignal (attribution: TrafficAttributionData): boolean {
  const query = attribution.query_params;
  const queryKeys = normalizeKeyList(Object.keys(query));
  const clickIdKeys = normalizeKeyList(getConfiguredList(
    'acquisitionClickIdKeys',
    DEFAULT_ACQUISITION_CLICK_ID_KEYS
  ));

  if (query.utm_source || query.utm_medium) {
    return true;
  }

  if (clickIdKeys.some((key) => queryKeys.indexOf(key) !== -1)) {
    return true;
  }

  return hasUsableExternalReferrer(attribution.referrer_url);
}

function normalizeAttributionValue (value: any): any {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return value;
  }

  const normalized: Record<string, any> = {};

  Object.keys(value)
    .filter((key) => typeof value[key] !== 'undefined')
    .sort()
    .forEach((key) => {
      normalized[key] = normalizeAttributionValue(value[key]);
    });

  return normalized;
}

export function isSameTouchAttribution (a: TrafficAttributionData, b: TrafficAttributionData): boolean {
  return JSON.stringify(normalizeAttributionValue(a)) === JSON.stringify(normalizeAttributionValue(b));
}
