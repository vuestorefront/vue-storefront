// @ts-check

/**
 * @typedef {Object} UserScore
 * @property {String} id
 * @property {Number} amount
 * @property {Object} user
 * @property {String} user.name
 * @property {String} user.githubProfile
 */

/**
 * Fetches users' scores.
 * @param {Number} [page=1]
 * @returns {Promise<UserScore[]>}
 */
const fetchUsersScores = async (page = 1) => {
  const params = new URLSearchParams({
    skip: ((page - 1) * 10).toString(),
    take: (10).toString(),
  });

  const url = `${process.env.COMMUNITY_API_URL}scoreboard/users?${params}`;

  const response = await window.fetch(url);

  const scores = await response.json();

  return scores ?? [];
};

export default fetchUsersScores;
