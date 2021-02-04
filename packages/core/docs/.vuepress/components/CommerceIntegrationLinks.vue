<template>
  <ul>
    <li>
      <router-link :to="commercetools">
        Commercetools
      </router-link>
    </li>
    <li>
      <router-link :to="shopify">
        Shopify <Badge text="beta" type="info" />
      </router-link>
    </li>
  </ul>
</template>

<script>
// this component will yell if you forgot to put a link for some specific integration
// this way it's harder to forget ;)
export default {
  props: {
    commercetools: {
      required: true
    },
    shopify: {
      required: true
    }
  }
}
</script>