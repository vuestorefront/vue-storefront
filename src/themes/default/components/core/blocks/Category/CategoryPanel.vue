<template>
  <div class="categories">
    <div
      v-if="activeCategory"
      class="categories__handler"
    >
      <h4 class="categories__heading">
        {{ $t('Active filter') }}
      </h4>

      <button
        class="categories__button categories__button--active no-outline py10 px20"
        type="button"
        @click="deleteFilter"
      >
        <span class="categories__button-text">
          {{ activeCategory.name }}
        </span>

        <i class="fs-medium material-icons">close</i>
      </button>
    </div>

    <div
      v-if="categories.length > 1"
      class="categories__handler"
    >
      <h4 class="categories__heading">
        {{ $t('Filter by categories') }}
      </h4>

      <template v-for="(category, index) in categories">
        <button
          v-if="isFilterHidden !== index"
          :key="index"
          class="categories__button no-outline bg-cl-transparent py10 px20"
          type="button"
          @click="filterProducts(category, index)"
        >
          {{ category.name }}
        </button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isFilterHidden: false
    }
  },
  computed: {
    activeCategory () {
      return this.$store.state.category.sidebar_selected_category
    }
  },
  methods: {
    filterProducts (category, buttonIndex) {
      this.isFilterHidden = buttonIndex
      this.$emit('input', [category.category_id])
    },
    deleteFilter () {
      this.isFilterHidden = false
      this.$store.dispatch('category/deleteSidebarSelectedCategory')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/variables/colors";

.categories {
  &__heading {
    width: 100%;
  }

  &__handler {
    display: flex;
    flex-wrap: wrap;
  }

  &__button {
    display: flex;
    align-items: center;
    margin-right: 15px;
    margin-bottom: 15px;
    border: 2px solid #333;
    transition: all 0.2s ease;

    &:hover {
      background: #333;
      color: #fff;
    }

    &--active {
      margin-right: 0;
      margin-bottom: 0;
    }
  }

  &__button-text {
    display: block;
    margin-right: 15px;
  }
}
</style>
