<template>
  <div>thank you page</div>
</template>

<script>

// TODO(CHECKOUT): implement thank-you page view

export default {
  setup(props, context) {
    context.emit('changeStep', 4);
  }
};
</script>
