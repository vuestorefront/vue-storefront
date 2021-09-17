
import { Ref } from '@vue/composition-api';
import { vsfRef, useVSFContext } from '../../utils';

function sharedRef<T>(value: T, key: string): Ref;
function sharedRef(key: string, _?): Ref;

function sharedRef<T>(value: T, key: string): Ref {
  const { $sharedRefsMap } = useVSFContext() as any;
  const givenKey = key || value;

  if ($sharedRefsMap.has(givenKey)) {
    return $sharedRefsMap.get(givenKey);
  }

  const newRef = vsfRef(
    key ? value : null,
    givenKey as string
  );

  $sharedRefsMap.set(givenKey, newRef);

  return newRef;
}

export { sharedRef };
