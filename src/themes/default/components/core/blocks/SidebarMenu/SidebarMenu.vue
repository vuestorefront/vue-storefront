<template>
  <div class="sidebar-menu fixed mw-100 bg-lightgray" :class="{ active: isOpen }">
    <div class="row between-xs">
      <div @click="closeMenu" class="flex-start px10 bg-white brdr-bottom brdr-c-lightgray">
        <sub-btn type="back" v-if="submenu.depth" class="flex-end center-self bg-transparent brdr-none" />
        <search-icon class="p15 icon hidden-md" />
        <wishlist-icon class="p15 icon hidden-md" />
        <account-icon class="p15 icon hidden-md" />
      </div>
      <div
        class="flex-end col-xs inline-flex pointer bg-white align-right end-xs brdr-bottom brdr-c-lightgray"
        @click="closeMenu"
      >
        <i class="material-icons p15">close</i>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 h4 serif">
        <ul class="p0 m0 relative sidebar-menu__list" :style="mainListStyles">
          <li @click="closeMenu" class="brdr-bottom brdr-c-lightgray bg-white">
            <router-link class="block px25 py20 c-darkgray no-underline" to="/" exact>
              {{ $t('Home') }}
            </router-link>
          </li>
          <li
            class="brdr-bottom brdr-c-lightgray bg-white flex"
            :key="category.slug"
            @click="closeMenu"
            v-for="category in categories"
            v-if="category.product_count > 0 || category.children_data.length > 0"
          >
            <router-link
              class="px25 py20 c-darkgray no-underline col-xs"
              :to="{ name: 'category', params: { id: category.id, slug: category.slug }}"
            >
              {{ category.name }}
            </router-link>
            <sub-btn class="flex-end w-50 center-self bg-transparent brdr-none align-right" :id="category.id"/>
            <sub-category :category-links="category.children_data" :id="category.id"/>
          </li>
          <li @click="closeMenu">
            <router-link class="block px25 py20 brdr-bottom brdr-c-alto c-darkgray no-underline" to="/magazine" exact>
              {{ $t('Magazine') }}
            </router-link>
          </li>
          <li @click="closeMenu">
            <router-link class="block px25 py20 brdr-bottom brdr-c-alto c-darkgray no-underline" to="/sale" exact>
              {{ $t('Sale') }}
            </router-link>
          </li>
          <li @click="closeMenu">
            <router-link class="block px25 py20 brdr-bottom brdr-c-alto c-darkgray no-underline" to="/order-tracking" exact>
              {{ $t('Track my order') }}
            </router-link>
          </li>
          <li @click="closeMenu" >
            <router-link v-if="currentUser" class="block px25 py20 c-darkgray no-underline col-xs" to="/my-account" exact>
              {{ $t('My account') }}
            </router-link>
            <sub-btn v-if="currentUser" class="flex-end w-50 center-self bg-transparent brdr-none align-right"/>
            <sub-category v-if="currentUser" :my-account-links="myAccountLinks" :id="'foo'"/>
            <a v-if="!currentUser" href="#" @click="login" class="block px25 py20 c-darkgray no-underline">
              {{ $t('My account') }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { coreComponent } from 'lib/themes'
import AccountIcon from '../Header/AccountIcon.vue'
import SearchIcon from '../Header/SearchIcon.vue'
import WishlistIcon from '../Header/WishlistIcon.vue'
import CompareIcon from '../Header/CompareIcon.vue'
import SubBtn from './SubBtn.vue'
import SubCategory from './SubCategory.vue'
import i18n from 'lib/i18n'

export default {
  mixins: [coreComponent('core/blocks/SidebarMenu/SidebarMenu')],
  components: {
    AccountIcon,
    WishlistIcon,
    CompareIcon,
    SearchIcon,
    SubCategory,
    SubBtn
  },
  data () {
    return {
      myAccountLinks: [
        {
          id: 1,
          name: i18n.t('My profile'),
          anchor: 'profile'
        },
        {
          id: 2,
          name: i18n.t('My shipping details'),
          anchor: 'shipping_details'
        },
        {
          id: 3,
          name: i18n.t('My newsletter'),
          anchor: 'newsletter'
        },
        {
          id: 4,
          name: i18n.t('My orders'),
          anchor: ''
        },
        {
          id: 5,
          name: i18n.t('My loyalty card'),
          anchor: ''
        },
        {
          id: 6,
          name: i18n.t('My product reviews'),
          anchor: ''
        }
      ]
    }
  },
  computed: {
    mainListStyles () {
      return this.submenu.depth ? `transform: translateX(${this.submenu.depth * 100}%)` : false
    },
    ...mapState({
      submenu: state => state.ui.submenu,
      currentUser: state => state.user.current
    })
  },
  methods: {
    login () {
      this.$store.commit('ui/setSignUp', true)
      this.$store.commit('ui/setOpenMyAccount', true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";

ul {
  list-style-type: none;
}

.sidebar-menu {
  height: 100vh;
  width: 350px;
  top: 0;
  left: 0;
  overflow: hidden;
  overflow-y: auto;
  transform: translateX(-100%);
  z-index: 3;
  transition: transform $duration-main $motion-main;

  &.active {
    transform: translateX(0);
  }

  &__list {
    transition: transform $duration-main $motion-main;
  }

}

</style>

<style lang="scss">
@import '~theme/css/base/global_vars';
$lightgray: map-get($colors, lightgray);

.sidebar-menu {
  li {
    &:hover {
      background-color: $lightgray;
    }
  }

  i {
    opacity: 0.6;

    &:hover{
      opacity: 1;
    }
  }
}
</style>
