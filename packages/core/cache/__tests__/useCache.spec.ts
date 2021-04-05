import { CacheTagPrefix } from '../src';

/**
 * Mocks
 */
const mockedModuleName = '@nuxtjs/composition-api';

/**
 * Variables
 */
const tags = [
  {
    prefix: CacheTagPrefix.Product,
    value: '1'
  },
  {
    prefix: CacheTagPrefix.Category,
    value: '2'
  },
  {
    prefix: CacheTagPrefix.View,
    value: '3'
  }
];

/**
 * Tests
 */
describe('useCache', () => {
  beforeEach(() => jest.resetModules());

  it('returns empty array by default', () => {
    jest.mock(mockedModuleName, () => ({
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
    const { useCache } = require('../src');
    const { getTags } = useCache();

    expect(getTags()).toEqual([]);
  });

  it('can add tags', () => {
    jest.mock(mockedModuleName, () => ({
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
    const { useCache } = require('../src');
    const { addTags, getTags } = useCache();

    addTags(tags);

    expect(getTags()).toEqual(tags);
  });

  it('can set / override tags', () => {
    jest.mock(mockedModuleName, () => ({
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
    const { useCache } = require('../src');
    const { addTags, setTags, getTags } = useCache();

    addTags(tags);
    setTags((currentTags) => currentTags.filter((tag) => tag.prefix === 'P'));

    expect(getTags()).toEqual([tags[0]]);
  });

  it('can clear tags', () => {
    jest.mock(mockedModuleName, () => ({
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
    const { useCache } = require('../src');
    const { addTags, clearTags, getTags } = useCache();

    addTags(tags);
    clearTags();

    expect(getTags()).toEqual([]);
  });

  it('runs when req in context is undefined', () => {
    jest.mock(mockedModuleName, () => ({
      useContext: () => {
        return {
          req: undefined
        };
      }
    }));
    const { useCache } = require('../src');
    const { getTags } = useCache();

    expect(getTags()).toEqual([]);
  });
});
