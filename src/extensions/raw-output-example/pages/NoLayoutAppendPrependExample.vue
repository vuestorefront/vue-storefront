<template>
  <div>This page is rendered with no JavaScripts attached - no layout at all</div>
</template>

<script>
export default {
  name: 'NoJSExample',
  asyncData ({ store, route, context }) {
    context.serverOutputTemplate = ''
    context.renderAppend = (context) => {
      return '<div>This content has been dynamically appended</div>'
    }
    context.renderPrepend = (context) => {
      return '<div>this content has been dynamically prepended</div>'
    }
    return new Promise((resolve, reject) => {
      resolve()
    })
  },
  data () {
    return {
      'exampleData': 'Data from base component'
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
