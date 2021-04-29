const megaMenuCategoriesQuery = ({ variables }) => {
  const query = `
    fragment DefaultRootCategory on Category {
      id
      slug(acceptLanguage: $acceptLanguage)
      name(acceptLanguage: $acceptLanguage)
      childCount
    }
    query categories($where: String, $sort: [String!], $limit: Int, $offset: Int, $acceptLanguage: [Locale!]) {
      categories(where: $where, sort: $sort, limit: $limit, offset: $offset) {
        offset
        count
        total
        results {
          ...DefaultRootCategory
        }
      }
    }
  `;

  variables.where = 'parent is not defined';

  return {
    query,
    variables
  };
};

module.exports = {
  megaMenuCategoriesQuery
};
