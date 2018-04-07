<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Head from 'theme/resource/head'

export default {
  components: {
    // Place main website components here (eg. overlay, header, footer, side menus)
    // Other components should be placed in pages they are displayed in
  },
  metaInfo: Head
}
</script>

<style lang="scss" src="./css/main.scss">
