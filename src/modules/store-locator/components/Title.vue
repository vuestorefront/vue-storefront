<template>
  <div class="display-card-title">
    <h4 class="m0">
      {{ storeName }}
    </h4>
    <div class="store-bg" v-if="myStore">
      <h6 class="m0">
        {{ $t('My Store') }}
      </h6>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    storeName: {
      type: String
    },
    myStore: {
      type: Boolean
    }
  }
}
</script>

<style  lang="scss" scoped>
    .display-card-title {
        display:flex;
        padding:10px 10px;
        border-bottom: 1px solid lightgrey;
    }
    .store-bg {
        background-color: green;
        color:white;
        margin:0px 10px;
        padding:5px 10px;
        border-radius: 5%;
        border:1px solid green;
    }
</style>
