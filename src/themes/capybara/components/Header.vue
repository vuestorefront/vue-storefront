<template>
  <div>
    <button @click="openCartSidebar">
      Open CartSidebar
    </button>
    <button @click="openWishlistSidebar">
      Open WishlistSidebar
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    openCartSidebar () {
      this.$store.dispatch('ui/toggleCartSidebar')
    },
    openWishlistSidebar () {
      this.$store.dispatch('ui/toggleWishlistSidebar')
    }
  }
}
</script>
