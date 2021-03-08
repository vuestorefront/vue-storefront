import {
  UseContentFactoryParams,
  useContentFactory,
  renderContentFactory,
  RenderContentFactoryParams
} from '../../src/factories';
import { UseContent } from '../../src/types';
import { shallowMount } from '@vue/test-utils';

describe('[CORE - factories] useContentFactory', () => {
  let params: UseContentFactoryParams<any, any>;
  let useContent: (cacheId: string) => UseContent<any, any>;
  const createContentFactoryMock = () => {
    params = {
      search: jest.fn().mockResolvedValueOnce({ id: 'test-id' })
    };
    useContent = useContentFactory<any, any>(params);
  };

  const factoryParams = {
    search: jest.fn()
  };

  const useContentMock = useContentFactory(factoryParams);

  beforeEach(() => {
    jest.clearAllMocks();
    createContentFactoryMock();
  });

  it('returns content initial values', () => {
    const { loading, content, error } = useContent('test-id');

    expect(content.value).toEqual([]);
    expect(loading.value).toEqual(false);
    expect(error.value).toEqual({});
  });

  it('invokes content search', async () => {
    const { search } = useContent('test-id');
    const searchParams = { contentId: 'test-id', contentUrl: 'test-url' };
    await search(searchParams);

    expect(params.search).toBeCalledWith(searchParams);
    expect(params.search).toBeCalledTimes(1);
  });

  it('should set error if factory method throwed', async () => {
    const err = new Error('zxczxcx');
    factoryParams.search.mockImplementationOnce(() => {
      throw err;
    });
    const { search, error } = useContentMock('a');

    await search({ someparam: 'qwerty' });

    expect(error.value.search).toBe(err);
  });
});

describe('[CORE - factories] renderContentFactory', () => {
  let renderContent: any;
  let extractContent: any;
  const renderContentFactoryMock = () => {
    extractContent = (content) => content;
    renderContent = renderContentFactory({ extractContent } as RenderContentFactoryParams<any>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    renderContentFactoryMock();
  });

  it('renders content as a Vue component', () => {
    const content = [{
      componentName: 'TestComponent',
      props: {
        title: 'test title'
      }
    }];
    const component = shallowMount(renderContent, {
      propsData: {
        content
      },
      components: {
        TestComponent: {}
      }
    });

    expect(component).toMatchObject({ isFunctionalComponent: undefined });
  });
});

