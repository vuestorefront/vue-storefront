import { ref, Ref } from '@vue/composition-api';
import { useSSR } from '@vue-storefront/core';
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

export default function usePrismic(cacheId?: string): UsePrismic {
  const { initialState, saveToInitialState } = useSSR(cacheId);
  const loading = ref(false);
  const error = ref(null);
  const doc: Ref<Document | Document[]> = ref(initialState || {});
  const meta: Ref<PrismicMeta | null> = ref(null);

  const search: Search = async (query: PrismicQuery | PrismicQuery[], options: PrismicOptions = {}) => {
    if (!initialState) {
      loading.value = true;
    }

    const { results, metadata } = await loadDocuments(query, options);

    meta.value = metadata;
    doc.value = results;
    saveToInitialState(doc.value);
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
