import { transformBlock } from './_utils';
import { PrismicSlice, PrismicMeta, PrismicBlock } from '../types';
import { Document } from 'prismic-javascript/d.ts/documents';

export const getPages = (doc: Document | Document[], pageUid?: string): Document | null | Document[] => {
  if (!pageUid) {
    return doc || [];
  }

  if (!Array.isArray(doc)) {
    return doc.uid === pageUid ? doc : null;
  }

  return doc.find((docElement) => docElement.uid === pageUid) || null;
};

export const getCurrentPage = (doc: PrismicMeta | null): number => doc ? doc.page : 0;

export const getResultsPerPage = (doc: PrismicMeta | null): number => doc ? doc.results_per_page : 0;

export const getResultsSize = (doc: PrismicMeta | null): number => doc ? doc.results_size : 0;

export const getTotalResultsSize = (doc: PrismicMeta | null): number => doc ? doc.total_results_size : 0;

export const getTotalPages = (doc: PrismicMeta | null): number => doc ? doc.total_pages : 0;

export const getNextPage = (doc: PrismicMeta | null): string | null => doc ? doc.next_page || null : null;

export const getPrevPage = (doc: PrismicMeta | null): string | null => doc ? doc.prev_page || null : null;

export const getPageUid = (page: Document): string => page.uid;

export const getPageId = (page: Document): string => page.id;

export const getPageType = (page: Document): string => page.type;

export const getPageHref = (page: Document): string => page.href;

export const getPageTags = (page: Document): string[] => page.tags;

export const getPageSlugs = (page: Document): string[] => page.slugs;

export const getPageLang = (page: Document): string => page.lang;

export const getBlocks = ({ data }: Document, blockName?: string): string | string[] => {
  const blockKeys = Object.keys(data || {})
    .filter((key) => key !== 'body')
    .filter((key) => data[key] !== null);

  if (blockName) {
    const key = blockKeys.find((blockKey) => blockKey === blockName);

    if (key === undefined) {
      return '';
    }

    return transformBlock(data[key]);
  }

  return blockKeys.map((key) => transformBlock(data[key]));
};

export const getSlices = ({ data }: Document, sliceType?: string): string[] | Array<string[]> => {
  const renderSliceElements = (slice: PrismicBlock): string => Object.keys(slice)
    .filter((key) => slice[key] !== null && Object.keys(slice[key].length !== 0))
    .map((key) => transformBlock(slice[key]))
    .join('');

  const slices = data.body as PrismicSlice[];

  if (sliceType) {
    const foundSlice = slices.find((slice) => slice.slice_type === sliceType);

    if (!foundSlice) {
      return [];
    }

    return [foundSlice.primary || {}, ...foundSlice.items].map((item) => renderSliceElements(item));
  }

  return slices
    .map((slice) => [slice.primary || {}, ...slice.items]
      .map((item) => renderSliceElements(item))
    );
};
