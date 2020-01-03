<template>
  <button type="button" class="p10 store-info-btn">
    {{ $t('Store Info') }}
  </button>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.store-info-btn {
  &:hover{
    background-color: black;
    color:white;
  }
    border: 1px solid black;
    border-radius: 5%;
    background-color: white;
    color:black;
}
</style>
