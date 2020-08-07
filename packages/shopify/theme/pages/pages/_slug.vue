<template>
  <div id="cms">
    <div
      class="cms-page"
    >
      <h4>{{ page.title }}</h4>
      <p v-html="page.body"></p>
    </div>
  </div>
</template>
<script>

import { useContent } from '@vue-storefront/shopify';

export default {
  async asyncData ({ params }) {

    const { loadPage } = useContent();
    const page = await loadPage(params.slug);
    return { page: page, title: page.title };
  },
  head () {
    return {
      title: this.title
    };
  }
};

</script>
