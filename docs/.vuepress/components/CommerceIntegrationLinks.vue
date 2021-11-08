<template>
  <ul>
    <li>
      <CommerceIntegrationLink 
        :url="commercetools"
        :wipValue="WIP"
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
const props = {
  commercetools: {
    required: true
  },
  shopify: {
    required: true
  }
};

const WIP = 'WIP';

export default {
  data () {
    return {
      WIP
    }
  },
  props
}
</script>
