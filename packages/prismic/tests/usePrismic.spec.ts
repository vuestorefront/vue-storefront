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
    const { doc, error, loading } = usePrismic();

    expect(loading.value).toBeFalsy();
    expect(Object.keys(doc.value).length).toBe(0);
    expect(error.value).toBeNull();
  });

  it('should return document', async () => {
    const { doc, search } = usePrismic();

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
    const { doc, meta, search } = usePrismic();

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
    const { doc, search } = usePrismic();

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
    const { doc, search } = usePrismic();

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value[0];

    const { getBlocks } = helpers;

    expect(JSON.stringify(getBlocks(page))).toBe('["test"]');
  });

  it('should find block to render', async () => {
    const { doc, search } = usePrismic();

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value[0];

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

    const page = doc.value[0];

    const { getBlocks } = helpers;

    expect(getBlocks(page, 'sampleElement')).toBe('<p>sample content</p>');
  });

  it('should return collection of rendered slices', async () => {
    const { doc, search } = usePrismic();

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value[0];

    const { getSlices } = helpers;

    const slices = getSlices(page);

    expect(Array.isArray(slices)).toBeTruthy();
    expect(slices).toHaveLength(2);
    expect(slices[0]).toHaveLength(4);
    expect(slices[1]).toHaveLength(4);
    expect(JSON.stringify(slices[0])).toBe('["","<p>a</p>","<p>b</p>","<p>c</p>"]');
    expect(JSON.stringify(slices[1])).toBe('["","<p>d</p>","<p>e</p>","<p>f</p>"]');
  });

  it('should return collection of rendered selected slice', async () => {
    const { doc, search } = usePrismic();

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value[0];

    const { getSlices } = helpers;

    const slice = getSlices(page, 'grid-slice');

    expect(Array.isArray(slice)).toBeTruthy();
    expect(slice).toHaveLength(4);
    expect(JSON.stringify(slice)).toBe('["","<p>a</p>","<p>b</p>","<p>c</p>"]');
  });

  it('should return empty collection if slice not found', async () => {
    const { doc, search } = usePrismic();

    createMock(prismicResponseMock);

    await search({});

    const page = doc.value[0];

    const { getSlices } = helpers;

    const slice = getSlices(page, 'unknown-slice');

    expect(Array.isArray(slice)).toBeTruthy();
    expect(slice).toHaveLength(0);
  });

  it('should pass when multiple queries', async () => {
    const { doc, search } = usePrismic();

    createMock(prismicResponseMock);

    await search([{}, {}]);

    expect(Array.isArray(doc.value)).toBeTruthy();
    expect(doc.value[0].uid).toBe('456');
  });

  it('should return first document but not as an array', async () => {
    const { doc, meta, search } = usePrismic();

    createMock(prismicResponseMock);

    await search({}, { getFirst: true });

    const docElement = doc as Ref<Document>;

    expect(meta.value).toBeNull();
    expect(Array.isArray(docElement.value)).toBeFalsy();
    expect(docElement.value.id).toBe('123');
  });

  it('should parse ArticleExampleMock', async () => {
    const { doc, search } = usePrismic();

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
    const { doc, search } = usePrismic();

    createMock(mockDocument(ArticleExampleMock));

    await search({}, { getFirst: true });

    const { getBlocks } = helpers;

    const blocks = getBlocks(doc.value as Document);

    expect(blocks).toHaveLength(11);
    expect(blocks[0]).toBe('<h1>Star Maker of The Month </h1>');
  });

  it('should parse slices for ArticleExampleMock', async () => {
    const { doc, search } = usePrismic();

    createMock(mockDocument(ArticleExampleMock));

    await search({}, { getFirst: true });

    const { getSlices } = helpers;

    const page = doc.value as Document;

    const slices = getSlices(page);
    const slice = getSlices(page, 'generic_text');

    expect(slices).toHaveLength(12);
    expect(slice).toHaveLength(2);
    expect(slice[0]).toBe('<h2>lorem ipsum</h2><p>lorem ipsum</p>');
  });

  it('should parse LegalExampleMock', async () => {
    const { doc, search } = usePrismic();

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
    const { doc, search } = usePrismic();

    createMock(mockDocument(LegalExampleMock));

    await search({}, { getFirst: true });

    const { getBlocks } = helpers;

    const blocks = getBlocks(doc.value as Document);

    expect(blocks).toHaveLength(3);
    expect(blocks[0]).toBe('terms-of-use');
  });

  it('should parse slices for LegalExampleMock', async () => {
    const { doc, search } = usePrismic();

    createMock(mockDocument(LegalExampleMock));

    await search({}, { getFirst: true });

    const { getSlices } = helpers;

    const page = doc.value as Document;

    const slices = getSlices(page);
    const slice = getSlices(page, 'text_with_tldr');

    expect(slices).toHaveLength(13);
    expect(slice).toHaveLength(2);
    expect(slice[0]).toBe('<h2>Introduction</h2><p>lorem ipsum</p><p>lorem ipsum<a  href="http://localhost"></a></p>');
  });
});
