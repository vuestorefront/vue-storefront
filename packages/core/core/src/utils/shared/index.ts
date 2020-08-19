
import { Ref } from '@vue/composition-api';

const sharedMap = new Map();

const getShared = (key: string) => sharedMap.get(key);

const shared = (el: Ref, key: string) => {
  if (sharedMap.has(key)) {
    return getShared(key);
  }

  sharedMap.set(key, el);

  return el;
};

export { shared, getShared };
