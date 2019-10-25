<template>
  <div class="categories">
    <h4 class="t-mb-4 t-text-base-light t-text-xs t-uppercase">
      {{ $t('Filter by categories') }}
    </h4>
    <div class="t-flex t--mx-4 t-px-2 t-overflow-scroll t-webkit-touch ">
      <button-component v-for="category in categories" :key="category.category_id" type="ghost" :icon="value.includes(category.category_id) ? 'check' : false" class="t-flex-fix t-mx-2" @click="toggleCategory(category)">
        {{ category.name }}
      </button-component>
    </div>
  </div>
</template>

<script>
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  name: 'CategoryPanel',
  components: {
    ButtonComponent
  },
  props: {
    categories: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  methods: {
    toggleCategory (category) {
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
