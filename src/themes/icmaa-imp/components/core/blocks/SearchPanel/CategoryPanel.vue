<template>
  <div class="categories">
    <h4 class="t-mb-4 t-text-base-light t-text-xs t-uppercase">
      {{ $t(title) }}
    </h4>
    <div class="t-flex t--mx-4 t-px-2 t-overflow-scroll t-scrolling-touch t-hide-scrollbar">
      <button-component v-for="category in categories" :key="category.category_id" type="ghost" :icon="value.includes(category.category_id) ? 'check' : false" class="t-flex-fix t-mx-2" @click="toggleCategory(category)">
        {{ category.name }}
      </button-component>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import i18n from '@vue-storefront/i18n'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  name: 'CategoryPanel',
  components: {
    ButtonComponent
  },
  props: {
    title: {
      type: String,
      default: 'Filter by categories'
    },
    categories: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    link: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      currentCategory: 'category-next/getCurrentCategory'
    })
  },
  methods: {
    toggleCategory (category) {
      if (this.link) {
        if (category.category_id === this.currentCategory.id) {
          this.$store.dispatch('ui/closeAll')
          return
        }

        this.$Progress.start()

        const filters = { id: category.category_id }
        return this.$store.dispatch('category-next/loadCategoryWithExtras', { filters }).then(category => {
          if (category) {
            this.$store.dispatch('ui/closeAll')
            this.$router.replace(this.localizedRoute(category.url_path))
          } else {
            this.$Progress.finish()
            this.$store.dispatch('notification/spawnNotification', {
              type: 'error',
              message: i18n.t('Sorry, but we couldn\'t find this category.'),
              action1: { label: i18n.t('OK') }
            })
          }
        })
      }

      const isSelected = this.value.includes(category.category_id)
      if (isSelected) {
        this.$emit('input', this.value.filter(categoryId => categoryId !== category.category_id))
      } else {
        this.$emit('input', [...this.value, category.category_id])
      }
    }
  }
}
</script>
