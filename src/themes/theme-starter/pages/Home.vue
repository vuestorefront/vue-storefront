<template>
  <div id="home">
    <img src="assets/logo.svg" :alt="$t('Vue Storefront Logo')">
    <h1>{{ $t('welcomeMessage') }}</h1>
    <p>{{ $t("In case of any problems please take a look at the docs. If you havn't find what you were looking for in docs feel free to ask your question on our Slack") }}</p>
    <P>{{ $t('Here are some links that can help you with developing your own theme') }}:</p>
    <p>
      <a href="https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Project%20structure.md">{{ $t('Project structure') }}</a> |
      <a href="https://github.com/DivanteLtd/vue-storefront/blob/master/doc/themes/Working%20with%20themes.md">{{ $t('Working with themes') }}</a> |
      <a href="https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Working%20with%20components.md">{{ $t('Working with components') }}</a> |
      <a href="https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20data.md">{{ $t('Working with data') }}</a>
    </p>
  </div>
</template>

<script>
export default {
  components: {
    // Place page-specific components here
  }
}
</script>

<style>

#home {
  text-align: center;
  font-family: Arial;
}

#home img {
  width: 200px;
}

</style>
