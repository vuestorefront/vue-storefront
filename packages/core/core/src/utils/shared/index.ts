
import { Ref } from '@vue/composition-api';
import { vsfRef } from '../../utils';

const sharedMap = new Map();

function sharedRef<T>(value: T, key: string): Ref;
function sharedRef<T>(key: string, _?): Ref;

function sharedRef<T>(value: T, key: string): Ref {
  const givenKey = key || value;

  if (sharedMap.has(givenKey)) {
    return sharedMap.get(givenKey);
  }

  const newRef = vsfRef(value, key);
  sharedMap.set(key, newRef);

  return newRef;
}

export { sharedRef };
