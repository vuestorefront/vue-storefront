<template>
  <div v-if="address">
    <p>
      <span v-for="(addressLine,index) in address.addressLines" :key="`store-${index}`">
        {{ addressLine }},
      </span>
      {{ address.sublocality }}
      {{ address.locality }}
      {{ address.administrativeArea }}
      {{ address.postalCode }}
    </p>
  </div>
</template>

<script>

export default {
  props: {
    address: {
      type: Object
    }
  }

}
</script>

<style  lang="scss" scoped>
@import "~theme/css/variables/grid";

</style>
