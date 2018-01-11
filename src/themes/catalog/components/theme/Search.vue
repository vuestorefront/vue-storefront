<template>
  <section class="search c-on-dark middle-xs">
      <div class="row center-xs pb20">
          <div class="col-md-6">
              <h1 class="c-on-dark extrabold">Find the right sporting clothes for all situations</h1>
          </div>
      </div>
      <div class="row center-xs">
          <div class="search-box col-md-8">
              <input type="text" class="m0 px25 inline-flex fs-medium" placeholder="What are you looking for?">
              <button class="m0 fs-medium inline-flex center-xs c-on-accent bg-accent bg-accent-hover">Find Product</button>
          </div>
      </div>
      <div class="top-searches row center-xs py70 fs-medium">
          <span class="extrabold px15">Top searches</span>
          <router-link to="/" class="px15 c-on-dark">Shoes</router-link>
          <router-link to="/" class="px15 c-on-dark">Bags</router-link>
          <router-link to="/" class="px15 c-on-dark">Longsleeves</router-link>
          <router-link to="/" class="px15 c-on-dark">Jackets</router-link>
      </div>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '~theme/css/vars/_colors.scss';

.search {
    padding-top: 100px;
}

.search-box {
    input, button {
        height: 60px;
        box-sizing: border-box;
        border: none;
    }
    input {
        width: 60%;
    }
    button {
        width: 25%;
        outline: none;
    }
}

.top-searches a:hover {
    text-decoration: underline;
}
</style>
