import { ref, Ref } from '@vue/composition-api'
import { prismic, endpoint, apiOptions } from '../../index'
import { PrismicQuery } from '../../types'
import { QueryOptions } from 'prismic-javascript/d.ts/ResolvedApi'
import ApiSearchResponse from 'prismic-javascript/d.ts/ApiSearchResponse'
import transformQuery from './transformQuery'

interface OptionsType {
  orderings?: string;
  pageSize?: number;
  page?: number;
}

type Search = (query: PrismicQuery, options?: OptionsType) => Promise<void>

interface UsePrismic {
  loading: Ref<boolean>;
  error: Ref<boolean>;
  doc: Ref<ApiSearchResponse>;
  search: Search;
}

export default function usePrismic(): UsePrismic {
  const loading = ref(false);
  const error = ref(null);
  const doc: Ref<ApiSearchResponse> = ref({} as ApiSearchResponse);

  const search: Search = async (query: PrismicQuery, options: OptionsType = {}) => {
    loading.value = true;

    doc.value = await prismic
      .getApi(endpoint, apiOptions)
      .then(api => api.query(
        transformQuery(query),
        options as QueryOptions
      ));

    loading.value = false;
  };

  return {
    loading,
    error,
    doc,
    search
  };
}
