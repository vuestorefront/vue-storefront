import { Ref } from '@vue/composition-api';
import { sharedRef } from '@vue-storefront/core';
import { PrismicQuery, PrismicMeta, PrismicOptions } from '../../types';
import { Document } from 'prismic-javascript/d.ts/documents';
import loadDocuments from './loadDocuments';

type Search = (query: PrismicQuery | PrismicQuery[], options?: PrismicOptions) => Promise<void>;

interface UsePrismic {
  loading: Ref<boolean>;
  error: Ref<boolean>;
  doc: Ref<Document | Document[]>;
  meta: Ref<PrismicMeta | null>;
  search: Search;
}

export default function usePrismic(cacheId: string): UsePrismic {
  const loading = sharedRef(false, `usePrismic-loading-${cacheId}`);
  const error = sharedRef(null, `usePrismic-error-${cacheId}`);
  const doc: Ref<Document | Document[]> = sharedRef({}, `usePrismic-doc-${cacheId}`);
  const meta: Ref<PrismicMeta | null> = sharedRef(null, `usePrismic-meta-${cacheId}`);

  const search: Search = async (query: PrismicQuery | PrismicQuery[], options: PrismicOptions = {}) => {
    loading.value = true;
    const { results, metadata } = await loadDocuments(query, options);

    meta.value = metadata;
    doc.value = results;
    loading.value = false;
  };

  return {
    loading,
    error,
    doc,
    meta,
    search
  };
}
