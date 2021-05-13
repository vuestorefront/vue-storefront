import { computed, ComputedRef, Ref } from '@vue/composition-api';
import { sharedRef } from '../shared';
import { ComputedProperty } from '../../types';

interface ErrorHandler<E> {
  get(name: string): ComputedRef<Error>;
  getAll(): ComputedProperty<E>;
  update(name: string, value: any): void;
  clear(name: string): void;
  clearAll(): void;
}

function createErrorHandler<E>(values: E, name: string): ErrorHandler<E> {
  const entries: Ref<E> = sharedRef({}, name);

  /**
   * Get single error
   */
  const get = (name) => computed(() => entries.value[name]);

  /**
   * Get all errors
   */
  const getAll = () => computed(() => entries.value);

  /**
   * Update single error
   */
  const update = (name, value: Error) => {
    entries.value = { ...entries.value, [name]: value };
  };

  /**
   * Clear single error
   */
  const clear = (name) => update(name, null);

  /**
   * Clear all errors
   */
  const clearAll = () => {
    entries.value = Object
      .keys(values)
      .reduce((carry: E, item: string) => ({
        ...carry,
        [item]: null
      }), {} as E);
  };

  clearAll();

  return {
    get,
    getAll,
    update,
    clear,
    clearAll
  };
}

export {
  createErrorHandler
};
