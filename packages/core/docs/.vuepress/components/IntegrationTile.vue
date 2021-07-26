<template>
  <component
    v-show="isVisible"
    :is="link ? 'a' : 'div'"
    :class="{ wip: isWip }"
    :href="link"
    class="tile"
  >
    <img
      :src="image"
      class="tile-image"
    />

    <span class="badge info" v-if="isEnterprise">Enterprise</span>
    <span class="badge wip" v-if="isWip">In progress</span>
    <span class="badge beta" v-if="isBeta">Beta</span>
    <span class="badge from-core" v-if="fromCore">From Core Team</span>
  </component>
</template>

<script>
export default {
  name: 'IntegrationTile',
  props: [
    'name', 
    'link', 
    'category', 
    'image', 
    'isWip', 
    'isBeta',
    'isEnterprise', 
    'fromCore',
    'compatibility'
  ],
  data () {
    return {
      isVisible: true
    }
  }
}
</script>


<style scoped>
.tile {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 180px;
  border: 1px solid #E5E7EB;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0;
}

.tile.wip {
  background-color: #F3F4F6;
}

.tile.wip .tile-image {
  opacity: 0.6;
  filter: grayscale(100%);
}

.tile-image {
  box-sizing: border-box;
  padding: 10px 20px 0;
  height: 110px;
  object-fit: contain;
}

.tile:not(.wip):hover {
  box-shadow:
    0 0 transparent,
    0 0 transparent,
    0 0 transparent,
    0 0 transparent,
    0 4px 6px -1px rgba(0,0,0,0.1),
    0 2px 4px -1px rgba(0,0,0,0.06);
  transition: 0.15s box-shadow;
}

.badge {
  position: absolute;
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  border-radius: 3px;
  padding: 2px 6px;
  color: #fff;
  top: 4px;
  left: 8px;
}

.badge.from-core {
  left: initial;
  background: #b19cd9;
  right: 8px;
}

.badge.beta {
  background: orange;
}

.badge.wip {
  background: darkgray;
}
</style>
