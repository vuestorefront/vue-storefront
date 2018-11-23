<template>
  <div class="categories">
    <div
      v-if="activeCategories.length > 0"
      class="categories__handler"
    >
      <h4 class="categories__heading">
        {{ $t('Active filters') }}
      </h4>

      <div
        v-for="(category, index) in activeCategories"
        :key="index"
        class="categories__button--active"
        @click="deleteFilter(category)"
      >
        {{ category.name }}
      </div>
    </div>

    <div class="categories__handler">
      <h4 class="categories__heading">
        {{ $t('Filter categories') }}
      </h4>

      <button
        v-for="(category, index) in categories"
        :key="index"
        class="categories__button"
        type="button"
        @click="filterProducts(category)"
      >
        {{ category.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productCategories: {
      type: Array,
      required: true
    }
  },
  computed: {
    activeCategory () {
      return this.$store.state.category.sidebar_selected_category
    },
    categories () {
      const flatArray = []
      const uniqueArray = []

      // Convert all showed productCategories to flat - one obj, one category
      this.productCategories.forEach(item => {
        flatArray.push(...item)
      })

      // Filter only for unique values
      flatArray.forEach(item => {
        if (!uniqueArray.find(category => (item.category_id === category.category_id))) {
          uniqueArray.push(item)
        }
      })

      // Return only unique values
      return uniqueArray
    }
  },
  methods: {
    filterProducts (category) {
      this.$store.dispatch('category/addSidebarSelectedCategory', category)
    },
    deleteFilter () {
      this.$store.dispatch('category/deleteSidebarSelectedCategory')
    }
  }
}
</script>
