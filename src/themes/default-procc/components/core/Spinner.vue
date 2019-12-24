<template functional>
  <div class="spinner">
    <svg height="22px" version="1.0" viewBox="0 0 128 128" width="22px" xml:space="preserve"
         xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"><rect fill="transparent" height="100%" width="100%" x="0" y="0" />
      <g transform="rotate(135 64 64)"><circle cx="16" cy="64" fill="#000000" fill-opacity="1" r="16" />
        <circle cx="16" cy="64" fill="#555555" fill-opacity="0.67" r="16" transform="rotate(45,64,64)"/>
        <circle cx="16" cy="64" fill="#949494" fill-opacity="0.42" r="16" transform="rotate(90,64,64)"/>
        <circle cx="16" cy="64" fill="#cccccc" fill-opacity="0.2" r="16" transform="rotate(135,64,64)"/>
        <circle cx="16" cy="64" fill="#e1e1e1" fill-opacity="0.12" r="16" transform="rotate(180,64,64)"/>
        <circle cx="16" cy="64" fill="#e1e1e1" fill-opacity="0.12" r="16" transform="rotate(225,64,64)"/>
        <circle cx="16" cy="64" fill="#e1e1e1" fill-opacity="0.12" r="16" transform="rotate(270,64,64)"/>
        <circle cx="16" cy="64" fill="#e1e1e1" fill-opacity="0.12" r="16" transform="rotate(315,64,64)"/>
        <animateTransform attributeName="transform" calcMode="discrete" dur="720ms" repeatCount="indefinite"
                          type="rotate"
                          values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"/></g></svg>
  </div>
</template>

<script>
  export default {
    name: 'Spinner',
    functional: true
  }
</script>

<style lang="scss" scoped>
  .spinner {
    padding: 0 15px;
  }
</style>
