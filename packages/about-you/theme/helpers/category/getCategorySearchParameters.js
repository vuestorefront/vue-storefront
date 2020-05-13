export const getCategorySearchParameters = (context) => {
  const { path } = context.root.$route;
  const pathWithoutPrefix = path.replace(/^.*\/c\//, '');

  return {
    path: [pathWithoutPrefix],
    with: {
      parents: 'all',
      children: 2
    }
  };
};
