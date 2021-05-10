import { CacheTag, UseCache, SetTagsFn } from '..';
import { useContext } from '@nuxtjs/composition-api';

const useCache = (): UseCache => {
  const { req }: any = useContext();

  if (!req) {
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

export default useCache;
