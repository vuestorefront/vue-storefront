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
// this component will yell if you forgot to put a link for some specific integration
// this way it's harder to forget ;)
import CommerceIntegrationLink from './CommerceIntegrationLink';

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
  props,
  components: {
    CommerceIntegrationLink
  }
}
</script>
