import { useSearchFactory } from '../../factories/useSearchFactory';
import { SearchResults, UseSearch } from '../../types';
import { params } from './factoryParams';

const useSearch: (cacheId: string) => UseSearch<SearchResults, any> = useSearchFactory<SearchResults, any>(params);

export default useSearch;
