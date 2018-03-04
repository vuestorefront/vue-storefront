<template>
  <div id="home">
    <img src="assets/logo.svg" :alt="$t('Vue Storefront Logo')">
    <section>
      <h1>{{ $t('Welcome to Vue Storefront theme starter') }}</h1>
      <p>{{ $t("In case of any problems please take a look at the docs. If you havn't find what you were looking for in docs feel free to ask your question on our Slack") }}</p>
    </section>
    <section>
      <p>{{ $t('Under /pages directiry you can find some predefined pages to speed up your development (based on VS example data, can be empty if you are using different data source)') }}:</p>
      <p><router-link to="/p/MS08/strike-endurance-tee-627/MS08">Product Page</router-link> | <router-link to="/c/women-20">Category Page</router-link></p>
    </section>
    <section>
      <h3>{{ $t('Here are some links that can help you with developing your own theme') }}:</h3>
      <p>
        <a href="https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Project%20structure.md">{{ $t('Project structure') }}</a> |
        <a href="https://github.com/DivanteLtd/vue-storefront/blob/master/doc/themes/Working%20with%20themes.md">{{ $t('Working with themes') }}</a> |
        <a href="https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Working%20with%20components.md">{{ $t('Working with components') }}</a> |
        <a href="https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20data.md">{{ $t('Working with data') }}</a> |
        <a href="https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20data.md">{{ $t('Working with translations') }}</a>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  components: {
    // Place page-specific components here
  }
}
</script>

<style scoped>

#home {
  text-align: center;
  font-family: Arial;
  margin: 20px auto;
  max-width: 650px;
}

#home img {
  width: 200px;
}

a {
  text-decoration: none;
  color: #2b875c;
}
</style>
