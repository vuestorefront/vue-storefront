<template>
  <nav class="Pagination" :aria-label="label">
    <ul class="Pagination__items">
      <li class="Pagination__item PaginationItem" @click="previous()">
        <span class="PaginationItem__arrow">←</span>
        <a :href="`?page=${page - 1}`" class="PaginationItem__anchor" @click.prevent>Previous</a>
      </li>

      <li class="Pagination__item PaginationItem" @click="next()">
        <a :href="`?page=${page + 1}`" class="PaginationItem__anchor" @click.prevent>Next</a>
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
  },

  computed: {
    label() {
      return `Pagination Navigation, Current Page ${this.page}`;
    },
  },

  methods: {
    next() {
      if (this.loading || this.empty) return;

      this.$emit('change', this.page + 1);
    },

    previous() {
      if (this.loading || this.page <= 1) return;

      this.$emit('change', this.page - 1);
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
    gap: 1rem;
    list-style: none;
  }
}

.PaginationItem {
  & &__anchor {
    color: $accentColor;
  }
}
</style>
