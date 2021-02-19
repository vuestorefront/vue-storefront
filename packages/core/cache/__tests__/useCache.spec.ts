import useCache from '../src/composables/useCache';

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
  { prefix: 'P', value: '1' },
  { prefix: 'C', value: '2' },
  { prefix: 'V', value: '3' }
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
