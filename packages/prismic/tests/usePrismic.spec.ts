/* eslint-disable camelcase, @typescript-eslint/camelcase */
import { usePrismic } from '../src/composables';
import { prismic } from '../src/index';
import * as helpers from '../src/helpers/index';
import { ApiOptions } from 'prismic-javascript/d.ts/Api';
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi';
import { Ref } from '@vue/composition-api';
import ApiSearchResponse from 'prismic-javascript/d.ts/ApiSearchResponse';
import { Document } from 'prismic-javascript/d.ts/documents';
import { PrismicSlice } from '../src/types';
import ArticleExampleMock from './mocks/ArticleExampleMock';
import LegalExampleMock from './mocks/LegalExampleMock';

const mockDocument = (doc: Document): ApiSearchResponse => ({
  page: 1,
  prev_page: 'prev-page',
  next_page: 'next-page',
  results: [doc],
  results_per_page: 1,
  results_size: 1,
  total_pages: 1,
  total_results_size: 1
});

const createMock = (mockResponse: ApiSearchResponse) => {
  jest
    .spyOn(prismic, 'getApi')
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    .mockImplementation(async (url: string, options?: ApiOptions) => {
      return {
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        query: async (query, optionsOrCallback) => mockResponse,
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        queryFirst: async (query, optionsOrCallback) => mockResponse.results[0]
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
    const { doc, error, loading } = usePrismic('1');

    expect(loading.value).toBeFalsy();
    expect(Object.keys(doc.value).length).toBe(0);
    expect(error.value).toBeNull();
  });

  it('should return document', async () => {
    const { doc, search } = usePrismic('2');

    createMock(prismicResponseMock);

    await search({}, {
      queryOptions: {
        page: 10
      }
    });

    expect(doc.value).not.toBeNull();
    expect(doc.value).toHaveLength(1);
    expect(Object.keys(doc.value[0].data)[0]).toBe('sampleElement');
    expect(doc.value[0].data.sampleElement).toBe('test');
  });

  it('should return correct values for document getters', async () => {
    const { doc, meta, search } = usePrismic('3');

    createMock(prismicResponseMock);

    await search({});

    const { getPages, getCurrentPage, getResultsPerPage, getResultsSize, getTotalResultsSize, getTotalPages, getNextPage, getPrevPage } = helpers;

    expect(getPages(doc.value)).toHaveLength(1);
    expect(getCurrentPage(meta.value)).toBe(1);
    expect(getResultsPerPage(meta.value)).toBe(1);
    expect(getResultsSize(meta.value)).toBe(1);
    expect(getTotalResultsSize(meta.value)).toBe(1);
    expect(getTotalPages(meta.value)).toBe(1);
    expect(getNextPage(meta.value)).toBe('next-page');
    expect(getPrevPage(meta.value)).toBe('prev-page');
  });

  it('should return correct values for page getters', async () => {
    const { doc, search } = usePrismic('4');

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value[0];

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
    const { doc, search } = usePrismic('5');

    createMock(prismicResponseMock);

    await search({});

    const { data } = doc.value[0];

    const { getBlocks } = helpers;

    expect(JSON.stringify(getBlocks(data))).toBe('["test"]');
  });

  it('should find block to render', async () => {
    const { doc, search } = usePrismic('6');

    createMock(prismicResponseMock);

    await search({});

    const { data } = doc.value[0];

    const { getBlocks } = helpers;

    expect(getBlocks(data, 'sampleElement')).toBe('test');
    expect(getBlocks(data, 'unknownElement')).toBe('');
  });

  it('should find many blocks to render', async () => {
    const { doc, search } = usePrismic('7');

    createMock(prismicResponseMock);

    await search({});

    const { data } = doc.value[0];
    const { getBlocks } = helpers;

    const blocks = getBlocks(data, ['sampleElement']);

    expect(Array.isArray(blocks)).toBeTruthy();
    expect(blocks).toHaveLength(1);
    expect(blocks[0]).toBe('test');
  });

  it('should pass when wrong data provided', () => {
    const { getBlocks } = helpers;

    const blocks = getBlocks(undefined);
    const block = getBlocks(undefined, 'unknown-element');

    expect(Array.isArray(blocks)).toBeTruthy();
    expect(blocks).toHaveLength(0);
    expect(block).toBe('');
  });

  it('should render paragraph block', async () => {
    const { doc, search } = usePrismic('8');

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

    const { data } = doc.value[0];

    const { getBlocks } = helpers;

    expect(getBlocks(data, 'sampleElement')).toBe('<p>sample content</p>');
  });

  it('should ignore empty strings in block', async () => {
    const emptyString = {
      empty: ''
    };

    const { getBlocks } = helpers;

    expect(getBlocks(emptyString, 'empty')).toBe('');
  });

  it('should override getBlocks rendering function', async () => {
    const { doc, search } = usePrismic('9');

    createMock(prismicResponseMock);

    await search({});

    const { data } = doc.value[0];
    const { getBlocks } = helpers;

    const block = getBlocks(data, 'sampleElement', () => 'override');
    const blocks = getBlocks(data, null, () => 'override');

    expect(block).toBe('override');
    expect(Array.isArray(blocks)).toBeTruthy();
    expect(blocks).toHaveLength(1);
    expect(blocks[0]).toBe('override');
  });

  it('should render collection of slices items', async () => {
    const { doc, search } = usePrismic('10');

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value[0];

    const { getSlices, getBlocks } = helpers;

    const slices = getSlices(page);

    expect(Array.isArray(slices)).toBeTruthy();
    expect(slices).toHaveLength(2);
    expect(slices[0].primary).toBeNull();
    expect(slices[1].primary).toBeNull();
    expect(slices[0].items).toHaveLength(3);
    expect(slices[1].items).toHaveLength(3);

    const renderedItems = [
      slices[0].items.map((item) => getBlocks(item, 'sampleSliceElement')),
      slices[1].items.map((item) => getBlocks(item, 'sampleSliceElement'))
    ];

    expect(JSON.stringify(renderedItems[0])).toBe('["<p>a</p>","<p>b</p>","<p>c</p>"]');
    expect(JSON.stringify(renderedItems[1])).toBe('["<p>d</p>","<p>e</p>","<p>f</p>"]');
  });

  it('should render correctly collection of selected slice items', async () => {
    const { doc, search } = usePrismic('11');

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value[0];

    const { getSlices, getBlocks } = helpers;

    const slice = getSlices(page, 'grid-slice');

    expect(slice.primary).toBeNull();
    expect(Array.isArray(slice.items)).toBeTruthy();
    expect(slice.items).toHaveLength(3);
    expect(getBlocks(slice.items[0], 'sampleSliceElement')).toBe('<p>a</p>');
    expect(getBlocks(slice.items[1], 'sampleSliceElement')).toBe('<p>b</p>');
    expect(getBlocks(slice.items[2], 'sampleSliceElement')).toBe('<p>c</p>');
  });

  it('should filter correctly selected slices', async () => {
    const { doc, search } = usePrismic('12');

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value[0];

    const { getSlices } = helpers;

    const slices = getSlices(page, ['grid-slice']);

    expect(Array.isArray(slices)).toBeTruthy();
    expect(slices).toHaveLength(1);
    expect(slices[0].primary).toBeNull();
    expect(slices[0].items).toHaveLength(3);
  });

  it('should use filtering function when provided', async () => {
    const { doc, search } = usePrismic('13');

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value[0];

    const { getSlices } = helpers;

    const slices = getSlices(page, (slice) => slice.slice_type !== 'list-slice');

    expect(Array.isArray(slices)).toBeTruthy();
    expect(slices).toHaveLength(1);
    expect(slices[0].slice_type).toBe('grid-slice');
  });

  it('should return empty collection if slice not found', async () => {
    const { doc, search } = usePrismic('14');

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value[0];

    const { getSlices } = helpers;

    const slice = getSlices(page, 'unknown-slice');

    expect(slice.primary).toBeNull();
    expect(Array.isArray(slice.items)).toBeTruthy();
    expect(slice.items).toHaveLength(0);
  });

  it('should pass when multiple queries', async () => {
    const { doc, search } = usePrismic('15');

    createMock(prismicResponseMock);

    await search([{}, {}]);

    expect(Array.isArray(doc.value)).toBeTruthy();
    expect(doc.value[0].uid).toBe('456');
  });

  it('should return first document but not as an array', async () => {
    const { doc, meta, search } = usePrismic('16');

    createMock(prismicResponseMock);

    await search({}, { getFirst: true });

    const docElement = doc as Ref<Document>;

    expect(meta.value).toBeNull();
    expect(Array.isArray(docElement.value)).toBeFalsy();
    expect(docElement.value.id).toBe('123');
  });

  it('should parse ArticleExampleMock', async () => {
    const { doc, search } = usePrismic('17');

    createMock(mockDocument(ArticleExampleMock));

    await search({});

    const page = doc.value[0] as Document;

    const { getPageUid, getPageId, getPageType, getPageHref, getPageTags, getPageSlugs, getPageLang } = helpers;

    expect(getPageUid(page)).toBe('star-maker-of-the-month');
    expect(getPageId(page)).toBe('Xhx-tRAAACUAWQUv');
    expect(getPageType(page)).toBe('article');
    expect(getPageHref(page)).toBe('http://localhost/documents/search?ref=XjP6oxQAACQANXY-&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22Xhx-tRAAACUAWQUv%22%29+%5D%5D');
    expect(getPageTags(page)).toHaveLength(1);
    expect(JSON.stringify(getPageTags(page))).toBe('["discoverable:false"]');
    expect(getPageSlugs(page)).toHaveLength(1);
    expect(getPageSlugs(page)[0]).toBe('star-maker-of-the-month');
    expect(getPageLang(page)).toBe('en-gb');
  });

  it('should parse blocks for ArticleExampleMock', async () => {
    const { doc, search } = usePrismic('18');

    createMock(mockDocument(ArticleExampleMock));

    await search({}, { getFirst: true });

    const { getBlocks } = helpers;
    const { data } = doc.value as Document;

    const blocks = getBlocks(data);

    expect(blocks).toHaveLength(11);
    expect(blocks[0]).toBe('<h1>Star Maker of The Month </h1>');
  });

  it('should parse slices for ArticleExampleMock', async () => {
    const { doc, search } = usePrismic('19');

    createMock(mockDocument(ArticleExampleMock));

    await search({}, { getFirst: true });

    const { getSlices, getBlocks } = helpers;

    const page = doc.value as Document;

    const slices = getSlices(page);
    const slice = getSlices(page, 'generic_text');

    expect(slices).toHaveLength(12);
    expect(getBlocks(slice.primary, 'generic_text')).toBe('<h2>lorem ipsum</h2><p>lorem ipsum</p>');
  });

  it('should parse LegalExampleMock', async () => {
    const { doc, search } = usePrismic('20');

    createMock(mockDocument(LegalExampleMock));

    await search({});

    const page = doc.value[0] as Document;

    const { getPageUid, getPageId, getPageType, getPageHref, getPageTags, getPageSlugs, getPageLang } = helpers;

    expect(getPageUid(page)).toBe(null);
    expect(getPageId(page)).toBe('WvLGVCsAAKn7PRtR');
    expect(getPageType(page)).toBe('legal');
    expect(getPageHref(page)).toBe('http://localhost/documents/search?ref=XjP6oxQAACQANXY-&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22WvLGVCsAAKn7PRtR%22%29+%5D%5D');
    expect(getPageTags(page)).toHaveLength(3);
    expect(JSON.stringify(getPageTags(page))).toBe('["tag:knitting","tag:crochet","tag:sewing"]');
    expect(getPageSlugs(page)).toHaveLength(1);
    expect(getPageSlugs(page)[0]).toBe('terms-of-use');
    expect(getPageLang(page)).toBe('en-gb');
  });

  it('should parse blocks for LegalExampleMock', async () => {
    const { doc, search } = usePrismic('21');

    createMock(mockDocument(LegalExampleMock));

    await search({}, { getFirst: true });

    const { data } = doc.value as Document;
    const { getBlocks } = helpers;

    const blocks = getBlocks(data);

    expect(blocks).toHaveLength(3);
    expect(blocks[0]).toBe('terms-of-use');
  });

  it('should parse slices for LegalExampleMock', async () => {
    const { doc, search } = usePrismic('22');

    createMock(mockDocument(LegalExampleMock));

    await search({}, { getFirst: true });

    const { getSlices, getBlocks } = helpers;

    const page = doc.value as Document;

    const slices = getSlices(page);
    const slice = getSlices(page, 'text_with_tldr');

    const primaryBlocks = getBlocks(slice.primary);

    expect(slices).toHaveLength(13);
    expect(slice.items).toHaveLength(1);
    expect(primaryBlocks).toHaveLength(3);
    expect(primaryBlocks[0]).toBe('<h2>Introduction</h2>');
    expect(primaryBlocks[1]).toBe('<p>lorem ipsum</p>');
    expect(primaryBlocks[2]).toBe('<p>lorem ipsum<a  href="http://localhost"></a></p>');
  });
});
