import { UseContentFactoryParams, useContentFactory, renderContentFactory } from '../../src/factories';
import { UseContent } from '../../src/types';
import { shallowMount } from '@vue/test-utils';

let useContent: (cacheId: string) => UseContent<any, any>;
let params: UseContentFactoryParams<any, any>;
const createContentFactoryMock = () => {
  params = {
    search: jest.fn().mockResolvedValueOnce({ id: 'test-id' })
  };
  useContent = useContentFactory<any, any>(params);
};

describe('[CORE - factories] useContentFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    createContentFactoryMock();
  });

  it('returns content initial values', () => {
    const { loading, content, error } = useContent('test-id');

    expect(content.value).toEqual([]);
    expect(loading.value).toEqual(false);
    expect(error.value).toEqual(null);
  });

  it('invokes content search', async () => {
    const { search } = useContent('test-id');
    const searchParams = { contentId: 'test-id', contentUrl: 'test-url' };
    await search(searchParams);

    expect(params.search).toBeCalledWith(searchParams);
  });
});

let render: any;
const renderContentFactoryMock = () => {
  render = renderContentFactory();
};

describe('[CORE - factories] renderContentFactory', () => {
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
    const component = shallowMount(render, {
      propsData: {
        content
      },
      components: {
        TestComponent: {},
        RenderContainer: {}
      }
    });

    expect(component).toMatchObject({ isFunctionalComponent: undefined });
  });
});

