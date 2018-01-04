<template>
  <div class="header b-bottom">
    <div class="row">
      <div class="col-sm-12 p10 c-secondary-lighter bg-secondary center-md">
        <a href="#">Visit our stores</a>, choose one of 100+ stores in 52 countries all over the world!
      </div>  
    </div>
    <div class="container">
      <div class="row middle-md">
        <div class="col-md-1 start-md b-right">
          <logo width="90%"/>
        </div>
        <div class="col-md-1 center-md">
          <i class="material-icons">search</i>
        </div>
        <div class="col-md-6">

        </div>
        <div class="col-md-2">

        </div>
        <div class="col-md-1">
          <i class="material-icons">favorite_border</i>
          </div>
        <div class="col-md-1">
          <i class="material-icons">forum</i>
        </div>
      </div>
    </div>
  </div>
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
</style>
