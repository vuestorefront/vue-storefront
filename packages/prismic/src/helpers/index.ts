import { transformBlock } from './_utils';
import { PrismicDocument, PrismicPage, PrismicSlice } from '../types';

export const getPages = (doc: PrismicDocument): PrismicPage[] => doc ? doc.results : [];

export const getCurrentPage = (doc: PrismicDocument): number => doc ? doc.page : 0;

export const getResultsPerPage = (doc: PrismicDocument): number => doc ? doc.results_per_page : 0;

export const getResultsSize = (doc: PrismicDocument): number => doc ? doc.results_size : 0;

export const getTotalResultsSize = (doc: PrismicDocument): number => doc ? doc.total_results_size : 0;

export const getTotalPages = (doc: PrismicDocument): number => doc ? doc.total_pages : 0;

export const getNextPage = (doc: PrismicDocument): string | null => doc ? doc.next_page || null : null;

export const getPrevPage = (doc: PrismicDocument): string | null => doc ? doc.prev_page || null : null;

export const getPageUid = (page: PrismicPage): string => page.uid;

export const getPageId = (page: PrismicPage): string => page.id;

export const getPageType = (page: PrismicPage): string => page.type;

export const getPageHref = (page: PrismicPage): string => page.href;

export const getPageTags = (page: PrismicPage): string[] => page.tags;

export const getPageSlugs = (page: PrismicPage): string[] => page.slugs;

export const getPageLang = (page: PrismicPage): string => page.lang;

export const getBlocks = ({ data }: PrismicPage, blockName?: string): string | string[] => {
  const blockKeys = Object.keys(data || {}).filter((key) => key !== 'body');

  if (blockName) {
    const key = blockKeys.find((blockKey) => blockKey === blockName);

    if (key === undefined) {
      return '';
    }

    return transformBlock(data[key]);
  }

  return blockKeys.map((key) => transformBlock(data[key]));
};

export const getSlices = ({ data }: PrismicPage, sliceType?: string): string[] | Array<string[]> => {
  const slices = data.body as PrismicSlice[];

  if (sliceType) {
    const foundSlice = slices.find((slice) => slice.slice_type === sliceType);

    if (!foundSlice) {
      return [];
    }

    return foundSlice.items.map((item) => transformBlock(item[Object.keys(item)[0]]));
  }

  return slices
    .map((slice) => slice.items
      .map((item) => transformBlock(item[Object.keys(item)[0]])
      )
    );
};

// TODO: meta data
export const getMeta = () => {};
