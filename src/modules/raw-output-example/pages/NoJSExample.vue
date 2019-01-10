<template>
  <div>This page is rendered with no JavaScripts attached - minimal layout (for example a base for AMPHTML)</div>
</template>

<script>
export default {
  name: 'NoJSExample',
  asyncData ({ store, route, context }) {
    context.output.template = 'basic'
    context.output.append = (context) => {
      return '<div>This content has been dynamically appended</div>'
    }
    context.output.prepend = (context) => {
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
