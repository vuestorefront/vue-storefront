<template>
  <div class="wrapper">
    <p class="row" v-if="OnlineOnly">
      <i class="material-icons icon">error</i>
      <span>An error occured while loading the component. </span>
      <span class="reload" @click="reload">Try again</span>
    </p>
    <p class="row" v-if="OfflineOnly">
      <i class="material-icons icon">error</i> Component couldn't be loaded due to lack of network connectivity.
    </p>
  </div>
</template>

<script>
import VueOfflineMixin from 'vue-offline/mixin'

export default {
  name: 'LoadingError',
  mixins: [VueOfflineMixin],
  methods: {
    reload () {
      this.$parent.getComponent()
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
  margin: 0px;
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
