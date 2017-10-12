<template>
  <div>
    <h2 class="align-center" :class="{ hidden: !showError }">We couldn't find what you were looking for</h2>
    <h3 class="align-center" :class="{ hidden: !showError }">But you can always <router-link class="c-darkgray" to="/" exact>go back</router-link></h3>
    {{ body }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      body: '',
      showError: false
    }
  },
  props: ['url'],
  created () {
    this.body = ''
    axios.get(this.$props.url)
      .then(res => {
        this.body = res
      })
      .catch(e => {
        this.showError = true
        console.log('Static content could not be loaded')
      })
  }
}
</script>

<style scoped>
  .hidden {
    display: none;
  }
</style>
