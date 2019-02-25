<template>
  <div class="wrapper">
    <div class="row" v-if="OnlineOnly">
      <i class="material-icons icon">error</i>
      <span>An error occured while loading the component. </span>
      <div>
        <span class="link" @click="reload">Try again</span> /
        <span class="link" @click="close"> Close</span>
      </div>
    </div>
    <div class="row" v-if="OfflineOnly">
      <i class="material-icons icon">error</i>
      <span>Component couldn't be loaded due to lack of network connectivity.</span>
      <span class="link" @click="close">Close</span>
    </div>
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
    },
    close () {
      this.$parent.close()
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
  margin: 5px;
}
.link {
  text-decoration: underline;
  cursor: pointer;
}
.row {
  justify-content: center;
  text-align: center;
}
div {
  text-align: center;
  line-height: 25px;
  & > * {
    width: 100%;
  }
}
</style>
