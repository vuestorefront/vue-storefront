import config from 'config';
import { Route } from 'vue-router';

import { TrafficAttributionData } from '../types/traffic-attribution.interface';

function normalizeValue (value: undefined | string | (string | null)[]): string {
  if (!value) {
    return '';
  }

  let stringValue = Array.isArray(value)
    ? value.reduce<string>((acc, item) => {
      if (item) {
        return acc + `${item},`
      }

      return acc;
    }, '')
    : value;

  if (stringValue.endsWith(',')) {
    stringValue = stringValue.slice(0, -1);
  }

  return stringValue;
}

export function getTrafficAttributionDataFromRoute (route: Route): TrafficAttributionData {
  const query = route.query;
  const reportableFields: string[] = config.trafficAttribution.reportableFields;
  const rawAttributeFields: string[] = config.trafficAttribution.rawAttributes;

  const attribution: TrafficAttributionData = {};

  for (const field of reportableFields) {
    const value = query[field];

    if (!value) {
      continue;
    }

    const normalizedValue = normalizeValue(value);

    if (normalizedValue) {
      attribution[field] = normalizedValue;
    }
  }

  const rawAttributes: TrafficAttributionData['rawAttributes'] = {};

  for (const field of rawAttributeFields) {
    const raw = query[field];
    const normalizedValue = normalizeValue(raw);

    if (normalizedValue) {
      rawAttributes[field] = normalizedValue;
    }
  }

  if (Object.keys(rawAttributes).length > 0) {
    attribution.rawAttributes = rawAttributes;
  }

  return attribution;
}
