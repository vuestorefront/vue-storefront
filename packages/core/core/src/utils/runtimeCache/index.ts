import { useVSFContext, sharedRef } from '../';

export const setCacheTimestamp = (key: string) => {
  const { $sharedRefsMap } = useVSFContext();
  const existingTimestamp = $sharedRefsMap.get(key);
  if (existingTimestamp) return existingTimestamp;
  const timestamp = sharedRef(Date.now(), key);
  return timestamp;
};

export const isCacheValid = (
  content: any,
  key: string,
  cacheTimeToLive = 300
) => {
  const { $sharedRefsMap } = useVSFContext();
  const isContentCached = content.value.length;
  if (isContentCached) {
    const timestamp = $sharedRefsMap.get(key);
    const now = Date.now();
    const cacheLife = (now - timestamp.value) / 1000;
    if (cacheLife < cacheTimeToLive) {
      return true;
    }
  } else {
    return false;
  }
};
