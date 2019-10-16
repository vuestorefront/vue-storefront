interface UseProduct<T, U = any, V = (configuration: any) => void> {
  product: T;
  configuration: U;
  configure: V;
}
interface UseCategory<T, U, V = () => any, X = () => any> {
  category: T;
  appliedFilters: U;
  applyFilter: V;
  clearFilters: X;
}
