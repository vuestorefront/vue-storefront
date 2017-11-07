<template>
    <div class="sidebar-menu bg-lightgray" :class="{ active: isOpen }">
        <div class="row">
            <div class="col-xs-12 close bg-white align-right end-xs brdr-underline brdr-c-lightgray" @click="closeMenu">
                <i class="material-icons p15">close</i>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 h4 serif">
                <ul class="p0 m0">
                    <li @click="closeMenu" class="brdr-underline brdr-c-lightgray bg-white">
                        <router-link class="px25 py20 c-black no-underline" to="/" exact>Home</router-link>
                    </li>
                    <li class="brdr-underline brdr-c-lightgray bg-white" v-bind:key="category.slug"  @click="closeMenu" v-for='category in categories' v-if='category.product_count >0 || category.children_data.length>0' >
                        <router-link class="px25 py20 c-black no-underline" :to="{ name: 'category', params: { id: category.id, slug: category.slug }}">{{ category.name }}</router-link>
                        <ul v-if="category.children_data" class="p0">
                            <li @click="closeMenu" v-bind:key="subcat.slug" v-for='subcat in category.children_data'  style="display: none">
                                <router-link class="px25 py20 no-underline" :to="{ name: 'category', params: { id: subcat.id, slug: subcat.slug }}">{{ subcat.name }}</router-link>
                            </li>
                        </ul>
                    </li>
                    <li @click="closeMenu">
                        <router-link class="px25 py20 brdr-underline brdr-c-alto c-black no-underline" to="/magazine" exact>Magazine</router-link>
                    </li>
                    <li @click="closeMenu">
                        <router-link class="px25 py20 brdr-underline brdr-c-alto c-black no-underline" to="/sale" exact>Sale</router-link>
                    </li>
                    <li @click="closeMenu">
                        <router-link class="px25 py20 brdr-underline brdr-c-alto c-black no-underline" to="/order-tracking" exact>Track my order</router-link>
                    </li>
                    <li @click="closeMenu">
                        <router-link class="px25 py20 brdr-underline brdr-c-alto c-black no-underline" to="/my-account" exact>My account</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/SidebarMenu/SidebarMenu')]
}
</script>

<style lang="scss" scoped>
@import "../../../../css/transitions.scss";

ul {
    list-style-type: none;
}

.sidebar-menu {
    height: calc(100vh - 55px);
    width: 350px;
    max-width: 100%;
    top: 55px;
    left: 0;
    overflow: hidden;
    position: fixed;
    transform: translateX(-100%);
    z-index: 2;
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
i {
    opacity: 0.6;
}
i:hover {
    opacity: 1;
}
</style>
