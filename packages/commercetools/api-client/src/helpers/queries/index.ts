import { CustomQueryFn } from './../../types/Api';

const getCustomQuery = <T = any>(customQueryFn: CustomQueryFn<T>, params) => {
  const { defaultQuery, defaultVariables } = params;

  if (customQueryFn) {
    const { query, variables } = customQueryFn(defaultQuery, defaultVariables);
    return {
      query: query || defaultQuery,
      variables: variables || defaultVariables};
  }

  return { query: defaultQuery, variables: defaultVariables };
};

export { getCustomQuery };

