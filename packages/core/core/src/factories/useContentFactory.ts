import { Ref, computed } from '@vue/composition-api';
import { UseContent } from '../types';
import { sharedRef } from '../utils/shared';

export declare type UseContentFactoryParams<CONTENT, CONTENT_SEARCH_PARAMS> = {
	search: (params: CONTENT_SEARCH_PARAMS) => Promise<CONTENT>;
};

export function useContentFactory<CONTENT, CONTENT_SEARCH_PARAMS>(
  factoryParams: UseContentFactoryParams<CONTENT, CONTENT_SEARCH_PARAMS>
) {
  return function useContent(id: string): UseContent<CONTENT, CONTENT_SEARCH_PARAMS> {
    const content: Ref<CONTENT> = sharedRef([], `useContent-content-${id}`);
    const loading: Ref<boolean> = sharedRef(false, `useContent-loading-${id}`);
    const error: Ref<string | null> = sharedRef(null, `useContent-error-${id}`);

    const search = async(params?: CONTENT_SEARCH_PARAMS): Promise<void> => {
      try {
        loading.value = true;
        content.value = await factoryParams.search(params);
      } catch (searchError) {
        error.value = searchError.toString();
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      content: computed(() => content.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}
