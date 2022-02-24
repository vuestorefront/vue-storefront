export const getCategorySearchParameters = (context) => {
  const { path } = context.root.$route;
  const slug = path.replace(/^\/c\//, '');

  return { slug };
};
