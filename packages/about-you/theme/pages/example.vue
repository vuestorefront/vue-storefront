<template>
  <div class="container">
    <div>
      <logo />
      {{ getCategoryName(categories[0]) }}
    </div>
  </div>
</template>

<script>
import { useCategory } from '@vue-storefront/about-you-composables';
import { getCategoryName } from '@vue-storefront/about-you-helpers';
import { computed } from '@vue/composition-api';

import Logo from '~/components/Logo.vue';
export default {
  setup() {

    const { categories, search } = useCategory();

    search({});

    const category = computed(() => categories.value[0]);
    const name = computed(() => getCategoryName(category.value));

    return {
      name,
      getCategoryName,
      categories
    };
  },
  components: {
    Logo
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
