import { useCache, CacheTagPrefix } from '../src';

/**
 * Mocks
 */
jest.mock('@nuxtjs/composition-api', () => ({
  useContext: () => {
    return {
      req: {
        $vsfCache: {
          tagsSet: new Set()
        }
      }
    };
  }
}));

/**
 * Variables
 */
const tags = [
  { prefix: CacheTagPrefix.Product, value: '1' },
  { prefix: CacheTagPrefix.Category, value: '2' },
  { prefix: CacheTagPrefix.View, value: '3' }
];

/**
 * Tests
 */
describe('useCache', () => {
  it('returns empty array by default', () => {
    const { getTags } = useCache();

    expect(getTags()).toEqual([]);
  });

  it('can add tags', () => {
    const { addTags, getTags } = useCache();

    addTags(tags);

    expect(getTags()).toEqual(tags);
  });

  it('can set / override tags', () => {
    const { addTags, setTags, getTags } = useCache();

    addTags(tags);
    setTags(currentTags => currentTags.filter(tag => tag.prefix === 'P'));

    expect(getTags()).toEqual([tags[0]]);
  });

  it('can clear tags', () => {
    const { addTags, clearTags, getTags } = useCache();

    addTags(tags);
    clearTags();

    expect(getTags()).toEqual([]);
  });
});
