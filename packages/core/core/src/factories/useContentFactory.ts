import { Ref, computed } from '@vue/composition-api';
import { RenderComponent, UseContent } from '../types';
import { sharedRef } from '../utils/shared';
import Vue, { VNode } from 'vue';

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
  resolveComponents: CONTENT[];
};

export function renderContentFactory(
  factoryParams: RenderContentFactoryParams<RenderComponent>
) {
  return function renderComponents(): VNode[] {
    const components = [];
    factoryParams.resolveComponents.map(component => {
      return new Vue({
        render(createElement): any {
          const { componentName, props } = component;
          components.push(createElement(componentName, { props }));
        }
      });
    });
    return components;
  };
}
