import { CacheTag, UseCache, SetTagsFn } from '../index';
import { useContext } from '@nuxtjs/composition-api';

export const useCache = (): UseCache => {
  const { req }: any = useContext();
  const isCacheEnabled = req && req.$vsfCache ? req.$vsfCache.enabled : false;

  if (!req || !isCacheEnabled) {
    return {
      addTags: () => {},
      clearTags: () => {},
      getTags: () => [],
      setTags: () => {}
    };
  }

  const $vsfCache = req.$vsfCache;
  const addTags = (tags: CacheTag[]) => tags.forEach(tag => $vsfCache.tagsSet.add(tag));
  const clearTags = () => $vsfCache.tagsSet.clear();
  const getTags = (): CacheTag[] => Array.from($vsfCache.tagsSet);
  const setTags = (fn: SetTagsFn) => {
    const tagsSet = $vsfCache.tagsSet;
    const newTags = fn(Array.from(tagsSet));
    tagsSet.clear();
    newTags.forEach(tag => tagsSet.add(tag));
  };

  return {
    addTags,
    clearTags,
    getTags,
    setTags
  };
};
