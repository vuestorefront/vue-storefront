<template>
  <div class="wrapper">
    <p class="row" v-if="OnlineOnly">
      <i class="material-icons icon">error</i>
      <span>An error occured while loading the component. </span>
      <span class="reload" @click="reload">Reload page</span>
    </p>
    <p class="row" v-if="OfflineOnly">
      <i class="material-icons icon">error</i> Component couldn't be loaded due to lack of network connectivity.
    </p>
  </div>
</template>

<script>
import VueOfflineMixin from 'vue-offline/mixin'

export default {
  mixins: [VueOfflineMixin],
  methods: {
    reload () {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #ff847b;
  color: white;
  padding: 20px;
}
.icon {
  font-size: 45px;
  margin: 10px;
}
.reload {
  text-decoration: underline;
  cursor: pointer;
}
.row {
  justify-content: center;
  text-align: center;
}
p {
  text-align: center;
  line-height: 25px;
  & > * {
    width: 100%;
  }
}
</style>
