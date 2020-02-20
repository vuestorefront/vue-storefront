/* eslint-disable camelcase, @typescript-eslint/camelcase */
import { usePrismic } from '../src/composables';
import { prismic } from '../src/index';
import * as helpers from '../src/helpers/index';
import { ApiOptions } from 'prismic-javascript/d.ts/Api';
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi';
import ApiSearchResponse from 'prismic-javascript/d.ts/ApiSearchResponse';
import { PrismicDocument, PrismicSlice } from '../src/types';

const createMock = (mockResponse: ApiSearchResponse) => {
  jest
    .spyOn(prismic, 'getApi')
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    .mockImplementation(async (url: string, options?: ApiOptions) => {
      return {
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        query: async (query, optionsOrCallback) => mockResponse
      } as ResolvedApi;
    });
};

const generateSlice = (text: string) => ({
  sampleSliceElement: [{
    type: 'paragraph',
    text,
    spans: []
  }]
});

const prismicSlicesMock: PrismicSlice[] = [
  {
    slice_type: 'grid-slice',
    slice_label: 'grid',
    items: [
      generateSlice('a'),
      generateSlice('b'),
      generateSlice('c')
    ],
    primary: null
  },
  {
    slice_type: 'list-slice',
    slice_label: 'list',
    items: [
      generateSlice('d'),
      generateSlice('e'),
      generateSlice('f')
    ],
    primary: null
  }
];

const prismicResponseMock: ApiSearchResponse = {
  page: 1,
  prev_page: 'prev-page',
  next_page: 'next-page',
  results: [
    {
      id: '123',
      alternate_languages: [],
      href: 'http://localhost',
      first_publication_date: 'first_pub_date',
      last_publication_date: 'last_pub_date',
      lang: 'en',
      slugs: [
        'slug1',
        'slug2'
      ],
      tags: [
        'tag1',
        'tag2'
      ],
      type: 'test-type',
      uid: '456',
      data: {
        sampleElement: 'test',
        body: prismicSlicesMock
      }
    }
  ],
  results_per_page: 1,
  results_size: 1,
  total_pages: 1,
  total_results_size: 1
};

describe('[prismic] usePrismic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should have correct initial values', () => {
    const { doc, error, loading } = usePrismic();

    expect(loading.value).toBeFalsy();
    expect(Object.keys(doc.value).length).toBe(0);
    expect(error.value).toBeNull();
  });

  it('should return document', async () => {
    const { doc, search } = usePrismic();

    createMock(prismicResponseMock);

    await search({}, {});

    expect(doc.value).not.toBeNull();
    expect(doc.value.results).toHaveLength(1);
    expect(Object.keys(doc.value.results[0].data)[0]).toBe('sampleElement');
    expect(doc.value.results[0].data.sampleElement).toBe('test');
  });

  it('should return correct values for document getters', async () => {
    const { doc, search } = usePrismic();

    createMock(prismicResponseMock);

    await search({});

    const fetchedDoc = doc.value as any as PrismicDocument;

    const { getPages, getCurrentPage, getResultsPerPage, getResultsSize, getTotalResultsSize, getTotalPages, getNextPage, getPrevPage } = helpers;

    expect(getPages(fetchedDoc)).toHaveLength(1);
    expect(getCurrentPage(fetchedDoc)).toBe(1);
    expect(getResultsPerPage(fetchedDoc)).toBe(1);
    expect(getResultsSize(fetchedDoc)).toBe(1);
    expect(getTotalResultsSize(fetchedDoc)).toBe(1);
    expect(getTotalPages(fetchedDoc)).toBe(1);
    expect(getNextPage(fetchedDoc)).toBe('next-page');
    expect(getPrevPage(fetchedDoc)).toBe('prev-page');
  });

  it('should return correct values for page getters', async () => {
    const { doc, search } = usePrismic();

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value.results[0] as any;

    const { getPageUid, getPageId, getPageType, getPageHref, getPageTags, getPageSlugs, getPageLang } = helpers;

    expect(getPageUid(page)).toBe('456');
    expect(getPageId(page)).toBe('123');
    expect(getPageType(page)).toBe('test-type');
    expect(getPageHref(page)).toBe('http://localhost');
    expect(getPageTags(page)).toHaveLength(2);
    expect(JSON.stringify(getPageTags(page))).toBe('["tag1","tag2"]');
    expect(getPageSlugs(page)).toHaveLength(2);
    expect(JSON.stringify(getPageSlugs(page))).toBe('["slug1","slug2"]');
    expect(getPageLang(page)).toBe('en');
  });

  it('should return rendered blocks', async () => {
    const { doc, search } = usePrismic();

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value.results[0] as any;

    const { getBlocks } = helpers;

    expect(JSON.stringify(getBlocks(page))).toBe('["test"]');
  });

  it('should find block to render', async () => {
    const { doc, search } = usePrismic();

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value.results[0] as any;

    const { getBlocks } = helpers;

    expect(getBlocks(page, 'sampleElement')).toBe('test');
    expect(getBlocks(page, 'unknownElement')).toBe('');
  });

  it('should render paragraph block', async () => {
    const { doc, search } = usePrismic();

    const responseMock = JSON.parse(JSON.stringify(prismicResponseMock)) as ApiSearchResponse;

    responseMock.results[0].data.sampleElement = [
      {
        type: 'paragraph',
        text: 'sample content',
        spans: []
      }
    ];

    createMock(responseMock);

    await search({});

    const page = doc.value.results[0] as any;

    const { getBlocks } = helpers;

    expect(getBlocks(page, 'sampleElement')).toBe('<p>sample content</p>');
  });

  it('should return collection of rendered slices', async () => {
    const { doc, search } = usePrismic();

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value.results[0] as any;

    const { getSlices } = helpers;

    const slices = getSlices(page);

    expect(Array.isArray(slices)).toBeTruthy();
    expect(slices).toHaveLength(2);
    expect(slices[0]).toHaveLength(3);
    expect(slices[1]).toHaveLength(3);
    expect(JSON.stringify(slices[0])).toBe('["<p>a</p>","<p>b</p>","<p>c</p>"]');
    expect(JSON.stringify(slices[1])).toBe('["<p>d</p>","<p>e</p>","<p>f</p>"]');
  });

  it('should return collection of rendered selected slice', async () => {
    const { doc, search } = usePrismic();

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value.results[0] as any;

    const { getSlices } = helpers;

    const slice = getSlices(page, 'grid-slice');

    expect(Array.isArray(slice)).toBeTruthy();
    expect(slice).toHaveLength(3);
    expect(JSON.stringify(slice)).toBe('["<p>a</p>","<p>b</p>","<p>c</p>"]');
  });

  it('should return empty collection if slice not found', async () => {
    const { doc, search } = usePrismic();

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value.results[0] as any;

    const { getSlices } = helpers;

    const slice = getSlices(page, 'unknown-slice');

    expect(Array.isArray(slice)).toBeTruthy();
    expect(slice).toHaveLength(0);
  });
});
