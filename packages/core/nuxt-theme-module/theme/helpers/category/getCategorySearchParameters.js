export const getCategorySearchParameters = (route) => {
  const { path } = route;
  const slug = path.replace(/^\/c\//, '');

  return { slug };
};
