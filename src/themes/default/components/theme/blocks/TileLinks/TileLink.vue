<template>
  <div class="tile-link">
    <a :href="tile.account_link">
      <div
        class="tile-image bg-lightgray"
        v-lazy:background-image="tile.background_image"
      >
        <div class="overlay flex bg-white h4">@{{ tile.account_name }}</div>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'TileLink',
    props: ['tile']
  }
</script>

<style lang="scss" scoped>
  @import '~src/themes/default/css/transitions';

  .tile-link {
    width: 322px;
    height: 280px;
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  .tile-image {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .overlay {
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 0.3s all $motion-main;
    &:hover,
    &:focus {
      opacity: 0.75;
    }
  }
</style>
