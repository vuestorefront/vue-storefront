<template>
  <div class="py40 px20">
    <h1>
      {{ $t('Thank you!') }}
    </h1>
    <p class="h4">
      {{ $t('Thank you for placing an order.') }}
    </p>
    <p v-if="isOnline" class="h4">
      {{ $t('Your order has been sent to the server and will be immediately processed') }}
    </p>
    <p v-else class="h4">
      {{ $t('Your order will be sent to the server as soon as you connect to the Internet and then confirmed regarding the stock quantities of selected items') }}
    </p>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Checkout/ThankYouPage')]
}
</script>
