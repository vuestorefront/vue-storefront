<template>
  <nav class="Pagination" :aria-label="label">
    <ul class="Pagination__items">
      <li v-if="canGoPrevious" class="Pagination__previous PaginationItem" @click="goPrevious">
        <span class="PaginationItem__arrow">←</span>
        <a :href="getHref(page - 1)" class="PaginationItem__anchor" aria-label="Previous Page" @click.prevent>Previous</a>
      </li>

      <li v-if="canGoNext" class="Pagination__next PaginationItem" @click="goNext">
        <a :href="getHref(page + 1)" class="PaginationItem__anchor" aria-label="Next Page" @click.prevent>Next</a>
        <span class="PaginationItem__arrow">→</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    page: Number,
    empty: Boolean,
    loading: Boolean,
    finished: Boolean,
  },

  computed: {
    label() {
      return `Pagination Navigation, Current Page ${this.page}`;
    },

    canGoNext() {
      return !this.loading && !this.empty && !this.finished;
    },

    canGoPrevious() {
      return !this.loading && this.page > 1;
    },
  },
  methods: {
    getHref(page) {
      const params = new URLSearchParams(location.search);

      params.set('page', page);

      return '?' + params.toString();
    },

    goNext() {
      if (this.canGoNext) {
        this.$emit('change', this.page + 1);
      }
    },

    goPrevious() {
      if (this.canGoPrevious) {
        this.$emit('change', this.page - 1);
      }
    },
  },
};
</script>

<style lang="stylus">
.Pagination {
  & &__items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  & &__next {
    margin-left: auto;
  }

  & &__previous {
    margin-right: auto;
  }
}

.PaginationItem {
  & &__anchor {
    color: $accentColor;
  }
}
</style>
