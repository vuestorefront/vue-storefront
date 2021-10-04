import { useVSFContext, sharedRef } from '../';
import { Ref } from '@vue/composition-api';

const _isContentCached = (content) => {
  if (!content) return false;
  if (Array.isArray(content)) return content.length;
  if (typeof content === 'object') return Object.keys(content.value).length;
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
  cacheTimeToLive = 300
) => {
  if (_isContentCached(content.value)) {
    const now = Date.now();
    const cacheLife = (now - timestamp.value) / 1000;
    if (cacheLife < cacheTimeToLive) {
      return true;
    }
  } else {
    return false;
  }
};
