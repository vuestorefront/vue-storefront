<template>
  <section>
    <p v-if="loading">Loading...</p>
    <table v-else>
      <thead>
        <tr>
          <th style="text-align: right;">Position</th>
          <th>Name</th>
          <th>GitHub Profile</th>
          <th style="text-align: right;">Score</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(score, index) in scores" :key="score.id">
          <th style="text-align: right;">{{ score.position }}</th>
          <td>{{ score.user.name }}</td>
          <td>
            <a rel="noreferrer noopener" :href="toGitHubLink(score)" target="_blank">
              {{ score.user.githubProfile }}
            </a>
          </td>
          <td style="text-align: right;">{{ score.amount }}</td>
        </tr>
      </tbody>
    </table>

    <Pagination
      :page="page"
      :empty="scores.length === 0"
      :loading="loading"
      :finished="scores.length < 10"
      @change="handlePageChange"
    />
  </section>
</template>

<script>
import Pagination from './Pagination.vue';
import fetchUsersScores from '../services/fetchUsersScores.js';

/**
 * @typedef {Object} UserScore
 * @property {String} id
 * @property {Number} amount
 * @property {Object} user
 * @property {String} user.name
 * @property {String} user.githubProfile
 */

export default {
  components: { Pagination },

  name: 'LeaderboardForUsers',

  data() {
    return {
      page: 1,
      scores: [],
      loading: false,
    };
  },

  methods: {
    toGitHubLink(score) {
      return `https://github.com/${score.user.githubProfile}`;
    },

    async updateScores() {
      this.loading = true;

      try {
        this.scores = await fetchUsersScores(this.page);
      } finally {
        this.loading = false;
      }
    },

    handlePageChange(page) {
      this.page = page;
      this.updateScores();
    },
  },

  mounted() {
    this.updateScores();
  },
};
</script>
