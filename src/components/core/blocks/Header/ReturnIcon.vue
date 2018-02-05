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
  name: 'ReturnIcon',
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>
