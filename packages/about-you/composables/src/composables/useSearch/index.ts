import { useSearchFactory } from '../../factories/useSearchFactory';
import { SearchResults, SearchSuggestionsEndpointParameters, UseSearch } from '../../types';
import { params } from './factoryParams';

const useSearch: (cacheId: string) => UseSearch<SearchResults, SearchSuggestionsEndpointParameters> = useSearchFactory<SearchResults, SearchSuggestionsEndpointParameters>(params);

export default useSearch;
