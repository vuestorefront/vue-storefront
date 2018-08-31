<template>
  <div class="sidebar-menu fixed mw-100 bg-cl-secondary" :class="{ active: isOpen }">
    <div class="row brdr-bottom-1 brdr-cl-bg-secondary">
      <div class="col-xs bg-cl-primary" v-if="submenu.depth">
        <sub-btn type="back" class="bg-cl-transparent brdr-none" />
      </div>
      <div class="col-xs bg-cl-primary">
        <button
          type="button"
          :aria-label="$t('Close')"
          class="w-100 inline-flex end-xs bg-cl-transparent brdr-none p0 close-btn"
          @click="closeMenu"
        >
          <i class="material-icons p15">close</i>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 h4 serif">
        <ul class="p0 m0 relative sidebar-menu__list" :style="mainListStyles">
          <li @click="closeMenu" class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary">
            <router-link
              class="block px25 py20 cl-accent no-underline"
              :to="localizedRoute('/')"
              exact
            >
              {{ $t('Home') }}
            </router-link>
          </li>
          <li
            class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary flex"
            :key="category.slug"
            @click="closeMenu"
            v-for="category in categories"
            v-if="category.product_count > 0 || category.children_data.length > 0"
          >
            <sub-btn
              class="bg-cl-transparent brdr-none fs-medium"
              :id="category.id"
              :name="category.name"
              v-if="category.children_data.length > 0"
            />
            <router-link
              v-else
              class="px25 py20 cl-accent no-underline col-xs"
              :to="localizedRoute({ name: 'category', params: { id: category.id, slug: category.slug }})"
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
              class="block px25 py20 brdr-bottom-1 brdr-cl-secondary cl-accent no-underline fs-medium-small"
              :to="localizedRoute('/sale')"
              exact
            >
              {{ $t('Sale') }}
            </router-link>
          </li>
          <li @click="closeMenu">
            <router-link
              class="block px25 py20 brdr-bottom-1 brdr-cl-secondary cl-accent no-underline fs-medium-small"
              :to="localizedRoute('/magazine')"
              exact
            >
              {{ $t('Magazine') }}
            </router-link>
          </li>
          <li @click="closeMenu" v-if="compareIsActive">
            <router-link
              class="block px25 py20 brdr-bottom-1 brdr-cl-secondary cl-accent no-underline fs-medium-small"
              :to="localizedRoute('/compare')"
              exact
            >
              {{ $t('Compare products') }}
            </router-link>
          </li>
          <li @click="closeMenu">
            <router-link
              class="block px25 py20 brdr-bottom-1 brdr-cl-secondary cl-accent no-underline fs-medium-small"
              :to="localizedRoute('/order-tracking')"
              exact
            >
              {{ $t('Track my order') }}
            </router-link>
          </li>
          <li @click="closeMenu" class="brdr-bottom-1 brdr-cl-secondary flex">
            <sub-btn
              v-if="currentUser"
              :name="$t('My account')"
              class="bg-cl-transparent brdr-none fs-medium-small"
            />
            <sub-category
              v-if="currentUser"
              :my-account-links="myAccountLinks"
              :id="'foo'"
            />
            <a
              v-if="!currentUser"
              href="#"
              @click.prevent="login"
              class="block w-100 px25 py20 cl-accent no-underline fs-medium-small"
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
import { mapState, mapGetters } from 'vuex'
import i18n from '@vue-storefront/i18n'

import SidebarMenu from '@vue-storefront/core/components/blocks/SidebarMenu/SidebarMenu'
import SubBtn from 'theme/components/core/blocks/SidebarMenu/SubBtn'
import SubCategory from 'theme/components/core/blocks/SidebarMenu/SubCategory'

export default {
  components: {
    SubCategory,
    SubBtn
  },
  mixins: [SidebarMenu],
  data () {
    return {
      myAccountLinks: [
        {
          id: 1,
          name: i18n.t('My profile'),
          url: '/my-account'
        },
        {
          id: 2,
          name: i18n.t('My shipping details'),
          url: '/my-account/shipping-details'
        },
        {
          id: 3,
          name: i18n.t('My newsletter'),
          url: '/my-account/newsletter'
        },
        {
          id: 4,
          name: i18n.t('My orders'),
          url: '/my-account/orders'
        },
        {
          id: 5,
          name: i18n.t('My loyalty card'),
          url: '#'
        },
        {
          id: 6,
          name: i18n.t('My product reviews'),
          url: '#'
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
    }),
    ...mapGetters('compare', {
      compareIsActive: 'isActive'
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

<style lang="scss">
@import "~theme/css/animations/transitions";
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$bg-secondary: color(secondary, $colors-background);
$color-gainsboro: color(gainsboro);
$color-matterhorn: color(matterhorn);
$color-mine-shaft: color(mine-shaft);

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

  @media (max-width: 767px) {
    width: 100vh;
  }

  &.active {
    transform: translateX(0);
  }

  &__list {
    transition: transform $duration-main $motion-main;
  }

  ul {
    list-style-type: none;
  }

  li {
    &:hover,
    &:focus {
      background-color: $color-gainsboro;
    }
    &.bg-cl-primary {
      &:hover,
      &:focus {
        background-color: $bg-secondary;
      }
    }
    a {
      color: $color-mine-shaft;
    }
  }

  button {
    color: $color-mine-shaft;a {
      color: $color-mine-shaft;
    }
  }

  .close-btn {
    i {
      color: $color-gainsboro;
    }
    &:hover,
    &:focus {
      i {
        color: $color-matterhorn;
      }
    }
  }

}
</style>
