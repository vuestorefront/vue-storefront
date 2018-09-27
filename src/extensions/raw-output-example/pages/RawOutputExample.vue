<template>
  <raw-output>
    This is example from custom module
  </raw-output>
</template>

<script>
export default {
  name: 'RawOutputExample',
  asyncData ({ store, route, context }) {
    context.server.res.setHeader('Content-Type', 'text/xml')
    context.serverOutputTemplate = ''

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
