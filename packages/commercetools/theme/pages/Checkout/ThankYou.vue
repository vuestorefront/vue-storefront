<template>
  <div class="thank-you">
    <p>Thank you for placing an order</p>
    <p>
      <nuxt-link to="/">Go back to homepage</nuxt-link>  
    </p>
    </div>
</template>

<script>

// TODO(CHECKOUT): implement thank-you page view

export default {
  setup(props, context) {
    context.emit('changeStep', 4);
  }
};
</script>

<style lang="scss" scoped>
.thank-you {
  color: #909090;
  background: #f4f4f4;
  font-size: .9em;
  padding: 30px;
  text-align: center;
  vertical-align: middle;
  margin: 20px;
  border-radius: 10px;
}
</style>
