import { isRef, ref, Ref, UnwrapRef } from '@vue/composition-api';

export function wrap<T>(element: Ref<UnwrapRef<T>> | T): Ref<UnwrapRef<T>> {
  return isRef(element) ? element : ref<T>(element as T);
}
