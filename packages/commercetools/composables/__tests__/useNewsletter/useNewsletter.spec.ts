import useNewsletter from '../../src/useNewsletter';

jest.mock('@vue-storefront/core', () => ({
  useNewsletterFactory: (params) => () => params
}));

describe('[commercetools-composables] useNewsletter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads newsletter data', async () => {
    const { load } = useNewsletter() as any;
    const defaultNewsletterData = {
      woman: false,
      man: false,
      kids: false
    };

    const loadedNewsletter = await load({});

    expect(loadedNewsletter).toStrictEqual(defaultNewsletterData);
  });

  it('updates newsletter data with new value', async () => {
    const { updateNewsletterData } = useNewsletter() as any;
    const mockedNewsletterData = {
      woman: true,
      man: false,
      kids: true
    };

    const updatedNewsletterData = await updateNewsletterData({}, mockedNewsletterData);

    expect(updatedNewsletterData).toMatchObject(mockedNewsletterData);
  });

  it('loads newsletter with changed newsletterData after update', async () => {
    const { load } = useNewsletter() as any;
    const defaultNewsletterData = {
      woman: true,
      man: false,
      kids: true
    };

    const loadedNewsletter = await load({});

    expect(loadedNewsletter).toStrictEqual(defaultNewsletterData);
  });
});

