<template>
  <ul>
    <li>
      <CommerceIntegrationLink 
        :url="commercetools"
        wipValue="WIP"
        label="commercetools"
      />
    </li>
    <li>
      <CommerceIntegrationLink 
        :url="shopify"
        :wipValue="WIP"
        label="Shopify"
        badge="beta"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CommerceIntegrationLinks',

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
