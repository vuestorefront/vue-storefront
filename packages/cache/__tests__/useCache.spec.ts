import { CacheTagPrefix, useCache } from '../src';
import { useContext } from '@nuxtjs/composition-api';

/**
 * Mocks
 */
jest.mock('@nuxtjs/composition-api', () => ({
  useContext: jest.fn()
}));

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
    const useContextMock = useContext as jest.Mock;
    useContextMock.mockImplementation(() => {
      return {
        req: {
          $vsfCache: {
            enabled: true,
            tagsSet: new Set()
          }
        }
      };
    });
    const { getTags } = useCache();

    expect(getTags()).toEqual([]);
  });

  it('can add tags', () => {
    const useContextMock = useContext as jest.Mock;
    useContextMock.mockImplementation(() => ({
      req: {
        $vsfCache: {
          enabled: true,
          tagsSet: new Set()
        }
      }
    }));
    const { addTags, getTags } = useCache();

    addTags(tags);

    expect(getTags()).toEqual(tags);
  });

  it('can set / override tags', () => {
    const useContextMock = useContext as jest.Mock;
    useContextMock.mockImplementation(() => ({
      req: {
        $vsfCache: {
          enabled: true,
          tagsSet: new Set()
        }
      }
    }));
    const { addTags, setTags, getTags } = useCache();

    addTags(tags);
    setTags((currentTags) => currentTags.filter((tag) => tag.prefix === 'P'));

    expect(getTags()).toEqual([tags[0]]);
  });

  it('can clear tags', () => {
    const useContextMock = useContext as jest.Mock;
    useContextMock.mockImplementation(() => ({
      req: {
        $vsfCache: {
          enabled: true,
          tagsSet: new Set()
        }
      }
    }));
    const { addTags, clearTags, getTags } = useCache();

    addTags(tags);
    clearTags();

    expect(getTags()).toEqual([]);
  });

  it('runs when req in context is undefined', () => {
    const useContextMock = useContext as jest.Mock;
    useContextMock.mockImplementation(() => ({
      req: undefined
    }));
    const { getTags } = useCache();

    expect(getTags()).toEqual([]);
  });
});
