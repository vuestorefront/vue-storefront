import { setCacheTimestamp } from '../../src/utils/runtimeCache';
import { useVSFContext, sharedRef } from '../../src/utils';

describe('runtimeCacheHelpers', () => {
  describe('>setCacheTimestamp', () => {
    let $sharedRefsMap;
    let mockedDateValue;

    const mockVSFContext = () => {
      $sharedRefsMap = new Map();
      (useVSFContext as any).mockImplementation(() => ({ $sharedRefsMap }));
    };
    const mockDateNow = () => {
      mockedDateValue = 12345;
      Date.now = jest.fn(() => mockedDateValue);
    };
    const mockSharedRef = () => {
      (sharedRef as any).mockImplementation((value, key) => {
        $sharedRefsMap.set(key, value);
        return value;
      });
    };

    beforeEach(() => {
      jest.clearAllMocks();
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

  describe('>isCacheValid', () => {
    describe('returns false', () => {
      it('when content is falsy', () => {});
      it('when content is an empty array', () => {});
      it('when content is an empty object', () => {});
      it('when cacheLife is greater than cacheTimeToLive', () => {});
    });

    describe('returns true', () => {
      it('when cacheLife is less than cacheTimeToLive', () => {});
    });
  });
});
