<template>
    <div class="thank-you-page">
    <h1>Thank you!</h1>
        <p>Thank you for placing an order. </p>
        <p v-if="isOnline">
            Your order has been sent to the server and will be immediately processed 
        </p>
        <p v-else> 
            Your order will be sent to the server as soon as you connect to the Internet and then confirmed regarding the stock qunatities of selected items
        </p>
    </div>
</template>

<script>
export default {
  name: 'thank-you-page',
  data () {
    return {
      isOnline: (typeof navigator !== 'undefined' ? navigator.isOnline : true)
    }
  }
}
</script>

<style scoped>
/* TO-DO: It's temporary, style it normally and move to theme */
.thank-you-page {
    padding: 40px 20px;
}
p {
    font-size: 18px;
}
</style>