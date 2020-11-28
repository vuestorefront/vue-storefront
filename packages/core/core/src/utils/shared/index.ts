
import { Ref } from '@vue/composition-api';
import { vsfRef, useContext } from '../../utils';

function sharedRef<T>(value: T, key: string): Ref;
function sharedRef<T>(key: string, _?): Ref;

function sharedRef<T>(value: T, key: string): Ref {
  const { $sharedRefsMap } = useContext() as any;
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
