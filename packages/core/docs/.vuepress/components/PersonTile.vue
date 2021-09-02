<template>
  <div class="person-tile">
    <img :src="photo" />
    <div><b> {{ name }} </b></div>
    <div class="gap">{{ company }} </div>
    <div><b><a href="https://discord.vuestorefront.io">Discord:</a></b> {{ discord }} </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'company', 'discord', 'photo']
}
</script>

<style scoped>
.person-tile {
  width: 200px;
  text-align: center;
}
.person-tile img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 20px 0;
}
.person-tile .gap {
  margin: 5px 0;
}
</style>