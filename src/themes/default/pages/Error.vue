<template>
  <div id="page_not_found">
    <section class="bg-cl-secondary py35 px20">
      <div class="container">
        <h2>
          {{ $t("Something went wrong ...") }}
        </h2>
      </div>
    </section>
    <section class="bg-cl-primary py35 px20">
      <div class="container">
        <div class="lh16 h5 weight-400">
          <p>
            {{ $t("We've noticed Internal Server Error while rendering this request.") }}
          </p>
          <p>
            {{ $t('If you need an assistance you can drop us a line on') }}
            <a href="mailto:contributors@vuestorefront.io" class="cl-secondary no-underline">
              {{ $t('a contact page') }}
            </a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Error from '@vue-storefront/core/pages/Error'

export default {
  name: 'Error',
  mixins: [Error]
}
</script>

<style scoped>
  a {
    text-decoration: underline;
  }
</style>
