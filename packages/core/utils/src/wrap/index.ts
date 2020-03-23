import {isRef, ref, Ref} from '@vue/composition-api';

export default function wrap<T>(element: Ref<T> | T): Ref<T> {
  return isRef(element) ? element : ref(element);
}
