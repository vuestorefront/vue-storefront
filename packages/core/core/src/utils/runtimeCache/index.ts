import { useVSFContext, sharedRef } from '../';
import { Ref } from '@vue/composition-api';

const _isContentCached = (content) => {
  if (!content) return false;
  if (Array.isArray(content)) return content.length;
  if (typeof content === 'object') return Object.keys(content).length;
  return true;
};

export const setCacheTimestamp = (key: string) => {
  const { $sharedRefsMap } = useVSFContext();
  const existingTimestamp = $sharedRefsMap.get(key);
  if (existingTimestamp) return existingTimestamp;
  const timestamp = sharedRef(Date.now(), key);
  return timestamp;
};

export const isCacheValid = (
  content: any,
  timestamp: Ref<number>,
  cacheTimeToLive?: number
) => {
  if (_isContentCached(content.value)) {
    if (!cacheTimeToLive) return true;
    const now = Date.now();
    const cacheLife = (now - timestamp.value);
    return cacheLife < cacheTimeToLive;
  } else {
    return false;
  }
};
