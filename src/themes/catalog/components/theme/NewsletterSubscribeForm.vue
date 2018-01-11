<template>
  <div class="newsletter-subscribe-form">
    <input type="text" class="m0 px25 inline-flex fs-medium" placeholder="E-mail address">
    <button class="m0 fs-medium inline-flex center-xs c-on-accent bg-accent bg-accent-hover">Subscribe to magazine</button>
  </div>
</template>


<style lang="scss" scoped>
.newsletter-subscribe-form {
    input, button {
        height: 60px;
        box-sizing: border-box;
        border: none;
    }
    input {
        width: 65%;
    }
    button {
        width: 35%;
        outline: none;
    }
}
</style>
