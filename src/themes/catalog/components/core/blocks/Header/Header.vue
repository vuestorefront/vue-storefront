<template>
  <header class="header b-bottom">

    <div class="col-sm-12 p15 c-secondary-lighter bg-secondary center-md">
      <router-link to="/">Visit our stores</router-link>, choose one of 100+ stores in 52 countries all over the world!
    </div>  

    <nav class="menu container">
      <div class="row middle-xs full-size">
        <div class="col-md-3 start-xs middle-xs inline-flex">
          <router-link to="/"><logo class="inline-flex pr25"/></router-link>
          <i class="material-icons b-left middle-xs px25 full-size inline-flex">search</i>
        </div>
        <div class="col-md-5 semibold end-xs middle-xs inline-flex uppercase">
          <router-link to="/" class="menu-link full-size px20 middle-xs flex">
            <div class="inline-flex">Football</div>
            <div class="material-icons inline-flex c-accent">keyboard_arrow_down</div>
          </router-link>
          <router-link to="/" class="menu-link full-size px20 middle-xs flex">
            <div class="inline-flex">Running</div>
            <div class="material-icons inline-flex c-accent">keyboard_arrow_down</div>          
          </router-link>
          <router-link to="/" class="menu-link full-size px20 middle-xs flex">
            <div class="inline-flex">Indoor</div>
            <div class="material-icons inline-flex c-accent">keyboard_arrow_down</div>        
          </router-link>
        </div>
        <div class="col-md-4 uppercase end-xs">
          <router-link to="/" class="px20 full-size magazine middle-xs semibold inline-flex">
            <div class="material-icons inline-flex pr10">book</div>   
            <div class="inline-flex">Magazine</div>
          </router-link>
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
@import '~theme/css/vars/colors';
@import '~theme/css/mixins/transitions';
@import '~theme/css/mixins/hovers';

a {
  color: $c-text-header-link;
}

.full-size {
  height: 75px;
}

.magazine {
    @include hover-bg($c-header-background-hover);
    line-height: 25px;
    .material-icons {
      color: $c-icon;
    }
}

i.material-icons {
    @include transition-icon;
    @include hover-bg($c-header-background-hover);
    color: $c-icon;
    &:hover {
        color: $c-icon-hover;
    }
}

.menu-link {
  @include hover-bg($c-header-background-hover);
  line-height: 25px;
}

//temporary
i.material-icons {
  cursor: pointer;
}
</style>
