<template>
  <div class="py40 px20" id="thank-you-content">
    <h1>
      {{ $t('Thank you!') }}
    </h1>
    <p class="h4">
      {{ $t('Thank you for placing an order.') }}
    </p>
    <p v-online class="h4">
      {{ $t('Your order has been sent to the server and will be immediately processed') }}
    </p>
    <p v-offline class="h4">
      {{ $t('Your order will be sent to the server as soon as you connect to the Internet and then confirmed regarding the stock quantities of selected items') }}
    </p>
    <div id="thank-you-extensions"/>
  </div>
</template>

<script>
import Composite from 'core/mixins/composite'

export default {
  name: 'ThankYouPage',
  mixins: [Composite]
}
</script>
