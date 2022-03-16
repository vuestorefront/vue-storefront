// @ts-check

/**
 * @typedef {Object} CompanyScore
 * @property {String} id
 * @property {Number} amount
 * @property {Object} company
 * @property {String} company.url
 * @property {String} company.name
 */

/**
 * Fetches companies' scores.
 * @param {Number} [page=1]
 * @returns {Promise<CompanyScore[]>}
 */
 const fetchCompaniesScores = async (page = 1) => {
  const params = new URLSearchParams({
    skip: ((page - 1) * 10).toString(),
    take: (10).toString(),
  });

  const url = `${process.env.COMMUNITY_API_URL}scoreboard/companies?${params}`;

  const response = await window.fetch(url);

  const scores = await response.json();

  return scores ?? [];
};

export default fetchCompaniesScores;
