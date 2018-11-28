<template>
  <raw-content>
    This page is using empty layout set in routes + no html template
  </raw-content>
</template>

<script>
export default {
  name: 'RawOutputExample',
  asyncData ({ store, route, context }) {
    context.server.response.setHeader('Content-Type', 'text/xml')
    context.output.template = ''
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
