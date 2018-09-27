<template>
  <div>
    This page is using empty layout set in routes
  </div>
</template>

<script>
export default {
  name: 'RawOutputExample',
  asyncData ({ store, route, context }) {
    context.response.setHeader('Content-Type', 'text/xml')
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
