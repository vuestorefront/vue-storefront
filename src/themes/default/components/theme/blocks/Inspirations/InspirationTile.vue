<template>
    <div class="inspiration-tile">
        <a :href="inspirationBlock.account_link">
          <div class="inspiration-image bg-lightgray" :style="{ backgroundImage: 'url(' + inspirationBlock.background_image + ')' }">
            <div class="overlay bg-white h4">@{{ inspirationBlock.account_name }}</div>
          </div>
        </a>
    </div>
</template>

<script>
import { thumbnail } from '../../../../../../lib/filters'

export default {
  name: 'inspiration-tile',
  props: ['inspiration-block'],
  computed: {
    thumbnail () {
      return thumbnail(this.inspirationBlock.background_image, 310, 300)
    }
  }
}
</script>

<style scoped>
.inspiration-tile {
  width: 100%;
  height: 350px;
}
.inspiration-image {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.overlay {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}
.overlay:hover {
  opacity: 0.75;
}
</style>