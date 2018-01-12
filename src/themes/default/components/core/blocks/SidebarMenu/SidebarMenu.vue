<template>
    <div class="sidebar-menu bg-lightgray" :class="{ active: isOpen }">
        <div class="row between-xs">
            <div @click="closeMenu" class="flex-start px15 bg-white brdr-bottom brdr-c-lightgray ">
                <search-icon class="p15 icon hidden-md" />
                <wishlist-icon class="p15 icon hidden-md" />
                <account-icon class="p15 icon hidden-md" />
                <sub-btn type="back" v-if="submenu.depth"></sub-btn>
            </div>
            <div class="flex-end col-xs close bg-white align-right end-xs brdr-bottom brdr-c-lightgray" @click="closeMenu">
                <i class="material-icons p15">close</i>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 h4 serif">
                <ul class="p0 m0 sidebar-menu__list" v-bind:style="mainListStyles">
                    <li @click="closeMenu" class="brdr-bottom brdr-c-lightgray bg-white">
                        <router-link class="px25 py20 c-black no-underline" to="/" exact>Home</router-link>
                    </li>
                    <li class="brdr-bottom brdr-c-lightgray bg-white flex" v-bind:key="category.slug" @click="closeMenu" v-for='category in categories' v-if='category.product_count >0 || category.children_data.length>0' >
                      <router-link class="px25 py20 c-black no-underline col-xs" :to="{ name: 'category', params: { id: category.id, slug: category.slug }}">{{ category.name }}</router-link>
                      <sub-btn class="flex-end center-self" :id="category.id"></sub-btn>
                      <sub-category :links="category.children_data" :id="category.id"></sub-category>
                    </li>
                    <li @click="closeMenu">
                        <router-link class="px25 py20 brdr-bottom brdr-c-alto c-black no-underline" to="/magazine" exact>Magazine</router-link>
                    </li>
                    <li @click="closeMenu">
                        <router-link class="px25 py20 brdr-bottom brdr-c-alto c-black no-underline" to="/sale" exact>Sale</router-link>
                    </li>
                    <li @click="closeMenu">
                        <router-link class="px25 py20 brdr-bottom brdr-c-alto c-black no-underline" to="/order-tracking" exact>Track my order</router-link>
                    </li>
                    <li @click="closeMenu">
                        <router-link v-if="currentUser" class="px25 py20 brdr-bottom brdr-c-alto c-black no-underline" to="/my-account" exact>My account</router-link>
                        <a v-else href="#" @click="login" class="px25 py20 brdr-bottom brdr-c-alto c-black no-underline">My account</a>
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
import SubBtn from './SubBtn.vue'
import SubCategory from './SubCategory.vue'

export default {
  mixins: [coreComponent('core/blocks/SidebarMenu/SidebarMenu')],
  components: {
    AccountIcon,
    WishlistIcon,
    SearchIcon,
    SubCategory,
    SubBtn
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
    max-width: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    overflow-y: auto;
    position: fixed;
    transform: translateX(-100%);
    z-index: 3;
    transition: transform $duration-main $motion-main;
}

.sidebar-menu.active {
  transform: translateX(0);
}

.sidebar-menu__list {
    position: relative;
    transition: transform $duration-main $motion-main;
}

.close {
    cursor: pointer;
    display: inline-flex;
}

a {
    display: block;
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

