import { useNewsletterFactory } from '../../src/factories';

const factoryParams = {
  load: jest.fn(() => null),
  updateNewsletterData: jest.fn()
};

const useNewsletter = useNewsletterFactory(factoryParams);
const useNewsletterMethods = useNewsletter();

const mockedNewsletterData = {
  woman: false,
  man: false,
  kids: false
};

describe('[CORE - factories] useNewsletterFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('initial setup', () => {
    it('should have proper initial properties', () => {
      const useNewsletter = useNewsletterFactory(factoryParams);
      const { loading, newsletter, error } = useNewsletter();

      expect(newsletter.value).toEqual({});
      expect(loading.value).toEqual(false);
      expect(error.value).toMatchObject({});
    });

    it('loading works during updateNewsletterData execution', async () => {
      const { loading } = useNewsletterMethods;
      let resolver = null;
      factoryParams.updateNewsletterData.mockReturnValueOnce(new Promise((resolve) => {
        resolver = resolve;
      }));
      useNewsletterMethods.updateNewsletterData(mockedNewsletterData);
      expect(loading.value).toBe(true);
      resolver();
      setTimeout(()=>{
        expect(loading.value).toBe(false);
      }, 0);
    });

    it('loading works during load execution', async () => {
      const { loading } = useNewsletterMethods;
      let resolver = null;
      factoryParams.load.mockReturnValueOnce(new Promise((resolve) => {
        resolver = resolve;
      }));
      useNewsletterMethods.load();
      expect(loading.value).toBe(true);
      resolver();
      setTimeout(()=>{
        expect(loading.value).toBe(false);
      }, 0);
    });

    it('updateNewsletterData method execution clears error', async () => {
      const { error } = useNewsletterMethods;
      const errorMsg = 'errorMsg';
      factoryParams.updateNewsletterData.mockReturnValueOnce(new Promise((_, reject) => {
        reject(errorMsg);
      }));
      await useNewsletterMethods.updateNewsletterData(mockedNewsletterData);
      expect(error.value).toBe(errorMsg);
      await useNewsletterMethods.updateNewsletterData(mockedNewsletterData);
      expect(error.value).toBe(null);
    });

    it('load method execution clears error', async () => {
      const { error } = useNewsletterMethods;
      const errorMsg = 'errorMsg';
      factoryParams.load.mockReturnValueOnce(new Promise((_, reject) => {
        reject(errorMsg);
      }));
      await useNewsletterMethods.load();
      expect(error.value).toBe(errorMsg);
      await useNewsletterMethods.load();
      expect(error.value).toBe(null);
    });

    it('load method sets billing info', async () => {
      factoryParams.load.mockReturnValueOnce(mockedNewsletterData);
      await useNewsletterMethods.load();
      expect(useNewsletterMethods.newsletter.value).toEqual(mockedNewsletterData);
    });

    it('updateNewsletterData method sets billing info', async () => {
      factoryParams.updateNewsletterData.mockReturnValueOnce(mockedNewsletterData);
      await useNewsletterMethods.updateNewsletterData(mockedNewsletterData);
      expect(useNewsletterMethods.newsletter.value).toEqual(mockedNewsletterData);
    });
  });
});
