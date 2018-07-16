<template>
  <static :is="staticLoaded"/>
</template>
<script>
export default {
  components: {
    static: null
  },
  data () {
    return {
      staticLoaded: false
    }
  },
  props: {
    file: {
      type: String,
      required: true
    }
  },
  watch: {
    file: function (newFile) {
      this.loadContent(newFile)
    }
  },
  mounted () {
    this.loadContent()
  },
  methods: {
    loadContent (file = this.file) {
      this.staticLoaded = false
      this.$options.components.static = require('../../resource/' + file + '.md').default
      this.staticLoaded = 'static'
    }
  }
}
</script>
