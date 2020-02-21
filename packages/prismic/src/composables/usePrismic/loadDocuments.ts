import { prismic, endpoint, apiOptions } from '../../index';
import { PrismicQuery, PrismicMeta, PrismicOptions } from '../../types';
import transformQuery from './transformQuery';
import { Document } from 'prismic-javascript/d.ts/documents';

interface LoadDocuments {
  results: Document | Document[];
  metadata: PrismicMeta | null;
}

export default async (query: PrismicQuery | PrismicQuery[], options: PrismicOptions = {}): Promise<LoadDocuments> => {
  const api = await prismic.getApi(endpoint, apiOptions);

  const { getFirst, queryOptions } = options;

  if (getFirst) {
    return {
      results: await api.queryFirst(transformQuery(query), queryOptions),
      metadata: null
    };
  }

  const { results, ...metadata } = await api.query(transformQuery(query), queryOptions);

  return {
    results,
    metadata
  };
};
