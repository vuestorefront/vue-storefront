export const getCategorySearchParameters = (context) => {
  const { params } = context.root.$route;
  const lastSlug = Object.keys(params).reduce((prev, curr) => params[curr] || prev, params.slug_1);

  return {
    slug: lastSlug
  };
};
