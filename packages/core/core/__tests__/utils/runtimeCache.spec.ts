import { isCacheValid } from '../../src/utils/runtimeCache';
import { ref } from '@vue/composition-api';

describe('isCacheValid', () => {
  describe('returns false', () => {
    it('when content is falsy', () => {
      const content = ref(null);
      const timestamp = ref(1);
      expect(isCacheValid(content, timestamp)).toBe(false);
    });
    it('when content is an empty array', () => {
      const content = ref([]);
      const timestamp = ref(1);
      expect(isCacheValid(content, timestamp)).toBe(false);
    });
    it('when content is an empty object', () => {
      const content = ref({});
      const timestamp = ref(1);
      expect(isCacheValid(content, timestamp)).toBe(false);
    });
    it('when cacheLife is greater than cacheTimeToLive', () => {
      const timestamp = ref(Date.now());
      const content = ref(['non-empty', 'content']);
      const cacheTimeToLive = 300;
      jest.spyOn(Date, 'now').mockImplementationOnce(() => timestamp.value + (301 * 1000));
      expect(isCacheValid(content, timestamp, cacheTimeToLive)).toBe(false);
    });
  });

  describe('returns true', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });
    it('when content is truthy and cacheTimeToLive param hasn\'t been passed', () => {
      const timestamp = ref(1);
      const content = ref(['non-empty', 'content']);
      expect(isCacheValid(content, timestamp)).toBe(true);
    });
    it('when cacheLife is less than cacheTimeToLive', () => {
      const timestamp = ref(Date.now());
      const content = ref(['non-empty', 'content']);
      const cacheTimeToLive = 300;
      jest.spyOn(Date, 'now').mockImplementationOnce(() => timestamp.value + (299 * 1000));
      expect(isCacheValid(content, timestamp, cacheTimeToLive)).toBe(true);
    });
  });
});
