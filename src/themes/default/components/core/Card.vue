<template>
  <div class="card">
    <div class="card-image">
      <slot name="image" />
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Card'
}
</script>
