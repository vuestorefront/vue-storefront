<template>
  <div class="sidebar-menu fixed mw-100 bg-lightgray" :class="{ active: isOpen }">
    <div class="row between-xs">
      <div @click="closeMenu" class="flex-start px10 bg-white brdr-bottom brdr-c-lightgray">
        <sub-btn type="back" v-if="submenu.depth" />
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
            <router-link class="block px25 py20 c-black no-underline" to="/" exact>Home</router-link>
          </li>
          <li
            class="brdr-bottom brdr-c-lightgray bg-white flex"
            :key="category.slug"
            @click="closeMenu"
            v-for="category in categories"
            v-if="category.product_count > 0 || category.children_data.length > 0"
          >
            <router-link
              class="px25 py20 c-black no-underline col-xs"
              :to="{ name: 'category', params: { id: category.id, slug: category.slug }}"
            >
              {{ category.name }}
            </router-link>
            <sub-btn class="flex-end center-self" :id="category.id"/>
            <sub-category :category-links="category.children_data" :id="category.id"/>
          </li>
          <li @click="closeMenu">
            <router-link class="block px25 py20 brdr-bottom brdr-c-alto c-black no-underline" to="/magazine" exact>
              Magazine
            </router-link>
          </li>
          <li @click="closeMenu">
            <router-link class="block px25 py20 brdr-bottom brdr-c-alto c-black no-underline" to="/sale" exact>
              Sale
            </router-link>
          </li>
          <li @click="closeMenu">
            <router-link class="block px25 py20 brdr-bottom brdr-c-alto c-black no-underline" to="/order-tracking" exact>
              Track my order
            </router-link>
          </li>
          <li @click="closeMenu" class="brdr-bottom brdr-c-alto flex">
            <router-link v-if="currentUser" class="block px25 py20 c-black no-underline col-xs" to="/my-account" exact>
              My account
            </router-link>
            <sub-btn v-if="currentUser" class="flex-end center-self"/>
            <sub-category v-if="currentUser" :my-account-links="myAccountLinks" :id="'foo'"/>
            <a v-if="!currentUser" href="#" @click="login" class="block px25 py20 c-black no-underline">My account</a>
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
          name: 'My profile',
          anchor: 'profile'
        },
        {
          id: 2,
          name: 'My shipping details',
          anchor: 'shipping_details'
        },
        {
          id: 3,
          name: 'My newsletter',
          anchor: 'newsletter'
        },
        {
          id: 4,
          name: 'My orders',
          anchor: ''
        },
        {
          id: 5,
          name: 'My loyalty card',
          anchor: ''
        },
        {
          id: 6,
          name: 'My product reviews',
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
@import "../../../../css/transitions.scss";

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
.sidebar-menu {
  li {
    &:hover {
      background-color: #F2F2F2;
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
