import { setCacheTimestamp, isCacheValid } from '../../src/utils/runtimeCache';
import { useVSFContext, sharedRef } from '../../src/utils';
import { ref } from '@vue/composition-api';

describe('runtimeCacheHelpers', () => {
  describe('setCacheTimestamp', () => {
    let $sharedRefsMap;
    let mockedDateValue;

    const mockVSFContext = () => {
      $sharedRefsMap = new Map();
      (useVSFContext as any).mockImplementation(() => ({ $sharedRefsMap }));
    };
    const mockDateNow = () => {
      mockedDateValue = 12345;
      jest.spyOn(Date, 'now').mockImplementation(() => mockedDateValue);
    };
    const mockSharedRef = () => {
      (sharedRef as any).mockImplementation((value, key) => {
        $sharedRefsMap.set(key, value);
        return value;
      });
    };

    beforeEach(() => {
      mockVSFContext();
      mockDateNow();
      mockSharedRef();
    });

    it('sets the new timestamp equal to Date.now() on the $sharedRefsMap', () => {
      const key = 'new-timestamp';
      setCacheTimestamp(key);
      expect($sharedRefsMap.get(key)).toBe(mockedDateValue);
    });

    it('returns the existing timestamp', () => {
      const key = 'existing-timestamp';
      const existingTimestamp = 123;
      $sharedRefsMap.set(key, existingTimestamp);
      const timestamp = setCacheTimestamp(key);
      expect(timestamp).toBe(existingTimestamp);
    });

    it('returns the new timestamp', () => {
      const key = 'new-timestamp';
      const timestamp = setCacheTimestamp(key);
      expect(timestamp).toBe(mockedDateValue);
    });
  });

  describe('isCacheValid', () => {
    describe('returns false', () => {
      beforeEach(() => {
        jest.restoreAllMocks();
      });
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
        jest.spyOn(Date, 'now').mockImplementation(() => timestamp.value + (301 * 1000));
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
        jest.spyOn(Date, 'now').mockImplementation(() => timestamp.value + (299 * 1000));
        expect(isCacheValid(content, timestamp, cacheTimeToLive)).toBe(true);
      });
    });
  });
});
