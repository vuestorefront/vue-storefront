<template>
  <div class="inspirations">
    <div class="row">
      <div class="col-md-4 p15" v-for="inspiration_block in inspiration_blocks">
        <inspiration-tile :inspiration-block="inspiration_block" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import InspirationTile from './InspirationTile.vue'
export default {
  name: 'inspirations',
  computed: {
    ...mapGetters({
      inspiration_blocks: 'inspirations/getInspirations'
    })
  },
  components: {
    InspirationTile
  }
}
</script>

<style scoped>
</style>