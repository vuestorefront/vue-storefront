import { Ref, computed } from '@vue/composition-api';
import {RenderContent, UseContent} from '../types';
import { sharedRef } from '../utils/shared';
import Vue from 'vue';

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

    const search = async(params: CONTENT_SEARCH_PARAMS): Promise<void> => {
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

export declare type RenderContentFactoryParams<CONTENT> = {
  content: CONTENT;
};

export function renderComponentFactory<CONTENT>(
  factoryParams: RenderContentFactoryParams<CONTENT>
) {
  return function renderContent(id: string): RenderContent<CONTENT> {
    const content: Ref<CONTENT> = sharedRef([], `renderComponent-content-${id}`);
    const loading: Ref<boolean> = sharedRef(false, `renderComponent-loading-${id}`);
    const error: Ref<string | null> = sharedRef(null, `renderComponent-error-${id}`);

    const { content: data } = factoryParams;
    try {
      loading.value = true;
      (content as any).value = () => {
        return new Vue({
          render(createElement) {
            const components = [];
            (data as any).map((component: { name: string; props: {} }) => {
              const { name, props } = component;
              const componentNode = createElement(`${name}`, { props });
              components.push(componentNode);
            });
            return createElement('div', components);
          }
        });
      };
    } catch (searchError) {
      error.value = searchError.toString();
    } finally {
      loading.value = false;
    }

    return {
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      components: computed(() => content.value)
    };
  };
}
