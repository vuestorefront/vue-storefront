<template>
  <header class="header b-bottom">

    <div class="row">
      <div class="col-sm-12 p15 c-secondary-lighter bg-secondary center-md">
        <router-link to="/">Visit our stores</router-link>, choose one of 100+ stores in 52 countries all over the world!
      </div>  
    </div>

    <nav class="menu container">
      <div class="row middle-xs full-size">
        <div class="col-md-3 start-xs middle-xs inline-flex">
          <logo class="inline-flex pr25"/>
          <i class="material-icons b-left middle-xs px25 full-size inline-flex">search</i>
        </div>
        <div class="col-md-5 semibold end-xs middle-xs inline-flex uppercase">
          <router-link to="/" class="menu-link px20">Football</router-link>
          <router-link to="/" class="menu-link px20">Running</router-link>
          <router-link to="/" class="menu-link px20">Indoor</router-link>
        </div>
        <div class="col-md-2 uppercase end-xs">
          <router-link to="/" class="px20 semibold">Magazine</router-link>
        </div>
        <div class="col-md-2 center-xs">
          <i class="material-icons middle-xs px25 full-size inline-flex b-left">favorite_border</i>
          <i class="material-icons middle-xs px25 full-size inline-flex">forum</i>
        </div>
      </div>
    </nav>

  </header>
</template>

<script>
import Logo from 'theme/components/core/Logo'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/vars/_colors.scss';

a {
  color: $c-text-header-link;
}

.full-size {
  height: 75px;
}
</style>
