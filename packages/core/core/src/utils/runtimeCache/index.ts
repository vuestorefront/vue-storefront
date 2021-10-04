import { useVSFContext, sharedRef } from '../';
import { Ref } from '@vue/composition-api';

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
  const isContentCached = content.value.length;
  if (isContentCached) {
    const now = Date.now();
    const cacheLife = (now - timestamp.value) / 1000;
    if (cacheLife < cacheTimeToLive) {
      return true;
    }
  } else {
    return false;
  }
};
