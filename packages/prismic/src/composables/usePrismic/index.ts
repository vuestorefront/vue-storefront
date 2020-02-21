import { ref, Ref } from '@vue/composition-api';
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

export default function usePrismic(): UsePrismic {
  const loading = ref(false);
  const error = ref(null);
  const doc: Ref<Document | Document[]> = ref({});
  const meta: Ref<PrismicMeta | null> = ref(null);

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
