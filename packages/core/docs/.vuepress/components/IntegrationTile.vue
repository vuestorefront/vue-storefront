<template>
<component :is="link ? 'a' : 'div'" class="tile" v-show="isVisible" :class="{ wip: isWip }" :href="link">
  <div class="image">
    <img :src="image" />
    <span class="badge info" v-if="isEnterprise">Enterprise</span>
    <span class="badge wip" v-if="isWip">Work in prorgess</span>
    <span class="badge beta" v-if="isBeta">Beta</span>
  </div>
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
    'compatibility'
  ],
  data () {
    return {
      isVisible: true
    }
  }
}
</script>


<style lang="scss" scoped>
.tile {
  @media (max-width: 719px) {
    width: 50%;
    height: 150px;
  }
  display: inline-flex;
  width: 230px;
  height: 230px;
  flex-direction: row;
  position: relative;
  margin: 10px 0;

  &.wip {
    img {
      opacity: 0.5
    }
    .badge.wip {
      background: darkgray;
    }
  }

  .image {
    @media (max-width: 719px) {
      width: 150px;
      height: 150px;
    }
    width: 230px;
    height: 230px;
    justify-content: center;
    display: flex;
    align-items: center;
    box-shadow: 0 0 23px -16px rgba(0,0,0,0.6);
    padding: 20px;
    box-sizing: border-box;
    position: absolute;

    &:hover {
      box-shadow: 0 0 23px -16px rgba(0,0,0,1);
      transition: 0.3s box-shadow;
    }
    
    .badge {
      position: absolute;
      font-size: 14px;
      height: 18px;
      line-height: 18px;
      border-radius: 3px;
      padding: 0 6px;
      color: #fff;
      top: 8px;
      left:8px;

      &.beta {
        background: orange;
      }
    }
  }
}
</style>