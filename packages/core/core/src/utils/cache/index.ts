import { CacheTag } from '../../types';
import { useContext } from '@nuxtjs/composition-api';

export type CacheDriver = (options: any) => {
  invoke: () => Promise<any>;
  invalidate: () => Promise<any>;
}

type SetTagsFn = (tags: CacheTag[]) => CacheTag[]

const useCache = () => {
  const { $vsfCache } = useContext();

  const addTags = (tags: CacheTag[]) => tags.forEach(tag => $vsfCache.tagsSet.add(tag));
  const cleanTags = () => $vsfCache.tagsSet.clear();
  const getTags = (): CacheTag[] => Array.from($vsfCache.tagsSet);
  const setTags = (fn: SetTagsFn) => {
    const tagsSet = $vsfCache.tagsSet;
    const newTags = fn(Array.from(tagsSet));
    tagsSet.clear();
    newTags.forEach(tag => tagsSet.add(tag));
  };
  const registerDriver = (cacheDriver: CacheDriver) => {
    $vsfCache.driver = cacheDriver;
  };
  const getCacheDriver = () => $vsfCache.driver;

  return {
    addTags,
    cleanTags,
    getTags,
    setTags,
    registerDriver,
    getCacheDriver
  };
};

export default useCache;
