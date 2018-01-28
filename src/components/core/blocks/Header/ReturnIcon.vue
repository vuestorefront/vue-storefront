<template>
  <div class="return-icon">
    <!--
        methods:
        goBack - opens previous page
    -->
  </div>
</template>

<script>
export default {
  name: 'return-icon',
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>
