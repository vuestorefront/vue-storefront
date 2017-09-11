<template>
  <div id="app">
     <img src="./assets/logo.png">
     <ul>
       <li><router-link to="/" exact>Home</router-link></li>
       <li><router-link to="/topics">Topics</router-link></li>
       <li><router-link to="/counter">Counter</router-link></li>
       <li><router-link to="/about">About</router-link></li>
     </ul>
     <main-header />
     <router-view class="view"></router-view>
     <main-footer />
  </div>
</template>

<script>
import MainHeader from 'components/core/blocks/Header/Header.vue'
import MainFooter from 'components/core/blocks/Footer/Footer.vue'

export default {
  components: {
    MainHeader,
    MainFooter
  }
}
</script>

<style>
  body {
    font-family: Helvetica, sans-serif;
  }
  .router-link-active{
    color: red ;
  }
</style>
