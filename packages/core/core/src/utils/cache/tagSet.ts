import { getCurrentInstance } from '@vue/composition-api';
import { CacheTag } from '../../types';

const tagsSet = new Set<CacheTag>();

export const getTagSet = () => {
  const vm = getCurrentInstance();
  const { context } = vm.$root as any;

  if (!context.req) {
    return tagsSet;
  }

  if (!context.req.vsfCache) {
    const tags = new Set<CacheTag>();

    context.req.vsfCache = { tags };
  }

  return context.req.vsfCache.tags;
};

