<template>
<div class="selector">
  <div class="selector__content">
    <span>STORE LOCATOR</span>
    <span><font-awesome-icon :icon="['fas', 'arrow-right']" /> {{ store }}</span>
  </div>
  <button class="circle-button" @click="$emit('click')">
    <font-awesome-icon :icon="['fas', 'location-arrow']" />
  </button>
</div>
</template>

<script>

export default {
  props: {
    store: {
      type: String,
      default: 'find your store'
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../pages/main.scss";

.selector {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 80px;
  display: flex;
  align-items: center;
  padding: 10px 30px;
  background-image: linear-gradient(to right, #fcbb01, #f98608);
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  border-radius: 4px 4px 0 0;

  &__content  {
    flex: 1;
    display: flex;
    align-items: center;

    span {
      color: #313131;
      font-size: 0.5625rem;
      font-weight: 600;
      text-transform: uppercase;
      margin-right: 10px;
    }

    span + span {
      color: white;
      font-size: 1.125rem;
    }
  }

  button {
    background: white;
    color: #666;
    width: 42px;
    height: 42px;
  }
}
</style>
