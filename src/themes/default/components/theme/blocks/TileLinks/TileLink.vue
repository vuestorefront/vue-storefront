<template>
  <div class="tile-link">
    <a :href="tile.account_link">
      <div
        class="tile-image w-100 bg-lightgray"
        v-lazy:background-image="tile.background_image"
      >
        <div class="overlay w-100 flex center-xs middle-xs bg-white h4">@{{ tile.account_name }}</div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'TileLink',
  props: {
    tile: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/animations/transitions';

  .tile-link {
    width: 322px;
    height: 280px;
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  .tile-image {
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .overlay {
    height: 100%;
    opacity: 0;
    transition: 0.3s all $motion-main;
    &:hover,
    &:focus {
      opacity: 0.75;
    }
  }
</style>
