<template>
  <section>
    <p v-if="loading">Loading...</p>
    <table v-else>
      <thead>
        <tr>
          <th style="text-align: right;">Position</th>
          <th>Name</th>
          <th>URL</th>
          <th style="text-align: right;">Score</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(score, index) in scores" :key="score.id">
          <th style="text-align: right;">{{ score.position }}</th>
          <td>{{ score.company.name }}</td>
          <td>
            <a rel="noreferrer noopener" :href="score.company.url" target="_blank">
              {{ score.company.url }}
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
import fetchCompaniesScores from '../services/fetchCompaniesScores.js';

export default {
  components: { Pagination },

  name: 'LeaderboardForCompanies',

  data() {
    return {
      page: 1,
      scores: [],
      loading: true,
    };
  },

  methods: {
    async updateScores() {
      this.loading = true;

      try {
        this.scores = await fetchCompaniesScores(this.page);
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
