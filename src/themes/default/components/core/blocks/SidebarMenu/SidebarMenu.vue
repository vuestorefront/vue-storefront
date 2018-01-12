<template>
    <div class="sidebar-menu bg-lightgray" :class="{ active: isOpen }">
        <div class="row">
            <div @click="closeMenu" class="col-xs-7 px15 bg-white brdr-bottom brdr-c-lightgray ">
                <search-icon class="p15 icon hidden-md" />
                <wishlist-icon class="p15 icon hidden-md" />
                <account-icon class="p15 icon hidden-md" />
            </div>
            <div class="col-xs-5 close bg-white align-right end-xs brdr-bottom brdr-c-lightgray" @click="closeMenu">
                <i class="material-icons p15">close</i>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 h4 serif">
                <ul class="p0 m0">
                    <li @click="closeMenu" class="brdr-bottom brdr-c-lightgray bg-white">
                        <router-link class="px25 py20 c-black no-underline" to="/" exact>Home</router-link>
                    </li>
                    <li class="brdr-bottom brdr-c-lightgray bg-white" v-bind:key="category.slug"  @click="closeMenu" v-for='category in categories' v-if='category.product_count >0 || category.children_data.length>0' >
                        <router-link class="px25 py20 c-black no-underline" :to="{ name: 'category', params: { id: category.id, slug: category.slug }}">{{ category.name }}</router-link>
                        <ul v-if="category.children_data" class="p0">
                            <li @click="closeMenu" v-bind:key="subcat.slug" v-for='subcat in category.children_data'  style="display: none">
                                <router-link class="px25 py20 no-underline" :to="{ name: 'category', params: { id: subcat.id, slug: subcat.slug }}">{{ subcat.name }}</router-link>
                            </li>
                        </ul>
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

export default {
  components: {
    AccountIcon,
    WishlistIcon,
    SearchIcon
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.current
    })
  },
  methods: {
    login () {
      this.$store.commit('ui/setSignUp', true)
      this.$store.commit('ui/setOpenMyAccount', true)
    }
  },
  mixins: [coreComponent('core/blocks/SidebarMenu/SidebarMenu')]
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
    transition: transform 300ms $motion-main;
}
.sidebar-menu.active {
    transform: translateX(0);
}
.close {
    cursor: pointer;
    display: inline-flex;
}
a {
    display: block;
}
li:hover {
    background-color: #F2F2F2;
}
</style>
<style lang="scss">
    .sidebar-menu i{
        opacity: 0.6;

        &:hover{
            opacity: 1;
        }
    }
</style>

