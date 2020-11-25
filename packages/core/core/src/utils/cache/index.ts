import { CacheTag } from '../../types';
import { useContext } from '@nuxtjs/composition-api';

export type CacheDriver = (options: any) => {
  invoke: () => Promise<any>;
  invalidate: () => Promise<any>;
}

type SetTagsFn = (tags: CacheTag[]) => CacheTag[]

const useCache = () => {
  const { req }: any = useContext();
  if (!req) {
    return {
      addTags: () => {},
      cleanTags: () => {},
      getTags: () => {},
      setTags: () => {}
    };
  }

  const $vsfCache = req.$vsfCache;
  const addTags = (tags: CacheTag[]) => tags.forEach(tag => $vsfCache.tagsSet.add(tag));
  const cleanTags = () => $vsfCache.tagsSet.clear();
  const getTags = (): CacheTag[] => Array.from($vsfCache.tagsSet);
  const setTags = (fn: SetTagsFn) => {
    const tagsSet = $vsfCache.tagsSet;
    const newTags = fn(Array.from(tagsSet));
    tagsSet.clear();
    newTags.forEach(tag => tagsSet.add(tag));
  };

  return {
    addTags,
    cleanTags,
    getTags,
    setTags
  };
};

export default useCache;
