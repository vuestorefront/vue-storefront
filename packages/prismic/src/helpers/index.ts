import { transform as transformFunction } from '../index';
import { PrismicSlice, PrismicMeta, TransformBlock } from '../types';
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

type ElementNameType = string | string[] | null | undefined;
type FilterSlice = (slice: PrismicSlice) => boolean;

export const getBlocks = (data: any, blockName?: ElementNameType, transform: TransformBlock = transformFunction): string | string[] => {
  if (typeof data !== 'object' || data === null) {
    return blockName ? '' : [];
  }

  const blockKeys = Object.keys(data)
    .filter((key) => key !== 'body')
    .filter((key) => data[key] !== null);

  if (typeof blockName === 'string') {
    const key = blockKeys.find((blockKey) => blockKey === blockName);

    if (key === undefined) {
      return '';
    }

    return transform(data[key]);
  }

  const filteredBlockKeys = Array.isArray(blockName)
    ? blockKeys.filter((key) => blockName.includes(key))
    : blockKeys;

  return filteredBlockKeys.map((key) => transform(data[key]));
};

type GetSlicesTypes = {
  (doc: Document, sliceType: string): PrismicSlice;
  (doc: Document, sliceType: string[] | null | undefined | FilterSlice): PrismicSlice[];
  (doc: Document): PrismicSlice[];
};

export const getSlices: GetSlicesTypes = ({ data }: Document, sliceType?: ElementNameType | FilterSlice): any => {
  const slices = data.body as PrismicSlice[];

  if (typeof sliceType === 'string') {
    const foundSlice = slices.find((slice) => slice.slice_type === sliceType);

    return foundSlice || {
      primary: null,
      items: [],
      slice_type: '', // eslint-disable-line
      slice_label: null // eslint-disable-line
    };
  }

  const filteredSlices = Array.isArray(sliceType)
    ? slices.filter((slice) => sliceType.includes(slice.slice_type))
    : slices;

  return typeof sliceType === 'function'
    ? filteredSlices.filter((slice) => sliceType(slice))
    : filteredSlices;
};
