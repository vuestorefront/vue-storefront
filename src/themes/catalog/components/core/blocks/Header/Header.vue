<template>
  <header class="header b-bottom">

    <div class="col-sm-12 p15 c-secondary-lighter bg-secondary center-xs">
      <router-link to="/">Visit our stores</router-link>, choose one of 100+ stores in 52 countries all over the world!
    </div>

    <nav class="menu container">
      <div class="row middle-xs full-size">
        <div class="col-xs-6 col-md-3 center-xs start-md middle-xs inline-flex">
          <router-link to="/"><logo class="logo inline-flex pr25"/></router-link>
          <i @click="focusSearchBox" class="material-icons b-left-md middle-xs px25 full-size inline-flex">search</i>
        </div>
        <div class="col-md-5 semibold end-xs middle-xs inline-flex uppercase hide flex-md">
          <router-link v-for="category in categories" :key="category.name" :to="'/c/' + category.slug" class="menu-link full-size px20 middle-xs flex">
            <div class="inline-flex">{{ category.name }}</div>
            <div class="material-icons inline-flex c-accent">keyboard_arrow_down</div>
          </router-link>
        </div>
        <div class="col-xs-6 col-md-4 uppercase end-xs">
          <router-link to="/" class="px20 full-size magazine middle-xs semibold inline-flex-md hide">
            <div class="material-icons inline-flex pr10">book</div>
            <div class="inline-flex">Magazine</div>
          </router-link>
          <i @click="openWishlist" class="material-icons middle-xs px25 full-size inline-flex b-left-md">favorite_border</i>
          <i @click="liveChatMessage" class="material-icons middle-xs px25 full-size inline-flex">forum</i>
        </div>
      </div>
    </nav>

  </header>
</template>

<script>
import WishlistIcon from './newcore_WishlistIcon'
import Logo from 'theme/components/core/Logo'

export default {
  computed: {
    categories () {
      return this.$store.state.category.list.filter(
        category => category.level === 2 &&
        (category.product_count > 0 || category.children_data.length > 0)
      ).splice(0, 4)
    }
  },
  methods: {
    getCategories () {
      return this.$store.dispatch('category/list', {})
    },
    liveChatMessage () {
      this.$bus.$emit('notification', {
        type: 'success',
        message: 'This feature has not been implemented yet. Please follow our <a class="c-on-dark" style="text-decoration: underline" href="https://github.com/DivanteLtd/vue-storefront/issues">Roadmap</a> for the details',
        action1: { label: 'OK', action: 'close' },
        timeToLive: 20000
      })
    },
    focusSearchBox () {
      this.$bus.$emit('focusSearch')
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    }
  },
  created () {
    this.getCategories()
  },
  components: {
    Logo
  },
  // TODO: Move wishlist icon mixin as a new core
  mixins: [WishlistIcon]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/vars/colors';
@import '~theme/css/mixins/transitions';
@import '~theme/css/mixins/hovers';

.logo {
  height: 50px;
}

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
