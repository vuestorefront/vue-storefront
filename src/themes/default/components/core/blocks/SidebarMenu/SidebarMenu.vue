<template>
  <div class="sidebar-menu fixed mw-100 bg-cl-secondary" :class="{ active: isOpen }">
    <div class="row between-xs">
      <div @click="closeMenu" class="flex-start px10 bg-cl-primary brdr-bottom brdr-cl-bg-secondary">
        <sub-btn type="back" v-if="submenu.depth" class="bg-cl-transparent brdr-none" />
        <search-icon class="p15 icon hidden-md" />
        <wishlist-icon class="p15 icon hidden-md" />
        <account-icon class="p15 icon hidden-md" />
      </div>
      <div class="col-xs bg-cl-primary">
        <button
          type="button"
          :aria-label="$t('Close')"
          class="w-100 inline-flex end-xs bg-cl-transparent brdr-none brdr-bottom brdr-cl-bg-secondary"
          @click="closeMenu"
        >
          <i class="material-icons p15">close</i>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 h4 serif">
        <ul class="p0 m0 relative sidebar-menu__list" :style="mainListStyles">
          <li @click="closeMenu" class="brdr-bottom brdr-cl-bg-secondary bg-cl-primary">
            <router-link
              class="block px25 py20 cl-accent no-underline"
              to="/"
              exact
            >
              {{ $t('Home') }}
            </router-link>
          </li>
          <li
            class="brdr-bottom brdr-cl-bg-secondary bg-cl-primary flex"
            :key="category.slug"
            @click="closeMenu"
            v-for="category in categories"
            v-if="category.product_count > 0 || category.children_data.length > 0"
          >
            <sub-btn
              class="bg-cl-transparent brdr-none"
              :id="category.id"
              :name="category.name"
              v-if="category.children_data.length > 0"
            />
            <router-link
              v-else
              class="px25 py20 cl-accent no-underline col-xs"
              :to="{ name: 'category', params: { id: category.id, slug: category.slug }}"
            >
              {{ category.name }}
            </router-link>

            <sub-category
              :category-links="category.children_data"
              :id="category.id"
              :parent-slug="category.slug"
            />
          </li>
          <li @click="closeMenu">
            <router-link
              class="block px25 py20 brdr-bottom brdr-cl-secondary cl-accent no-underline"
              to="/magazine"
              exact
            >
              {{ $t('Magazine') }}
            </router-link>
          </li>
          <li @click="closeMenu">
            <router-link
              class="block px25 py20 brdr-bottom brdr-cl-secondary cl-accent no-underline"
              to="/sale"
              exact
            >
              {{ $t('Sale') }}
            </router-link>
          </li>
          <li @click="closeMenu">
            <router-link
              class="block px25 py20 brdr-bottom brdr-cl-secondary cl-accent no-underline"
              to="/order-tracking"
              exact
            >
              {{ $t('Track my order') }}
            </router-link>
          </li>
          <li @click="closeMenu" class="brdr-bottom brdr-cl-secondary flex">
            <router-link
              v-if="currentUser"
              class="block px25 py20 cl-accent no-underline col-xs"
              to="/my-account"
              exact
            >
              {{ $t('My account') }}
            </router-link>
            <sub-btn
              v-if="currentUser"
              class="w-50 bg-cl-transparent brdr-none align-right"
            />
            <sub-category
              v-if="currentUser"
              :my-account-links="myAccountLinks"
              :id="'foo'"
            />
            <a
              v-if="!currentUser"
              href="#"
              @click="login"
              class="block w-100 px25 py20 cl-accent no-underline"
            >
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
import { coreComponent } from 'core/lib/themes'
import AccountIcon from '../Header/AccountIcon.vue'
import SearchIcon from '../Header/SearchIcon.vue'
import WishlistIcon from '../Header/WishlistIcon.vue'
import CompareIcon from '../Header/CompareIcon.vue'
import SubBtn from './SubBtn.vue'
import SubCategory from './SubCategory.vue'
import i18n from 'core/lib/i18n'

export default {
  mixins: [coreComponent('blocks/SidebarMenu/SidebarMenu')],
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
      this.$bus.$emit('modal-show', 'modal-signup')
      this.$store.commit('ui/setOpenMyAccount', true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$bg-secondary: color(secondary, $colors-background);

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

  li {
    &:hover,
    &:focus {
      background-color: $bg-secondary;
    }
  }

  button {
    &:hover,
    &:focus {
      opacity: 1;
    }
  }
}
</style>
