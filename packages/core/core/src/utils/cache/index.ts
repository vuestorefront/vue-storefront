import { CacheTag } from '../../types';
import { getTagSet } from './tagSet';

export type CacheDriver = (options: any) => {
  invoke: () => Promise<any>;
  invalidate: () => Promise<any>;
}

type SetTagsFn = (tags: CacheTag[]) => CacheTag[]

let driver: CacheDriver = null;

const addTags = (tags: CacheTag[]) => {
  const tagsSet = getTagSet();
  tags.forEach(tag => tagsSet.add(tag));
};

const cleanTags = () => getTagSet().tagsSet.clear();

const getTags = (): CacheTag[] => Array.from(getTagSet());

const setTags = (fn: SetTagsFn) => {
  const tagsSet = getTagSet();
  const newTags = fn(Array.from(tagsSet));
  tagsSet.clear();
  newTags.forEach(tag => tagsSet.add(tag));
};

const registerDriver = (cacheDriver: CacheDriver) => {
  driver = cacheDriver;
};

const getCacheDriver = () => driver;

const cache = {
  addTags,
  cleanTags,
  getTags,
  setTags,
  registerDriver,
  getCacheDriver
};

export default cache;
