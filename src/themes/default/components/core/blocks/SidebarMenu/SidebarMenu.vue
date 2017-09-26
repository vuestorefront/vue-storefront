<template>
    <div class="sidebar-menu" :class="{ active: isOpen }">
        <div class="row">
            <div class="col-md-12 close end-xs" @click="closeMenu">
                <i class="material-icons p15">close</i>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <ul>
                    <!-- TO-DO: Remove closemenu and handle it via store -->
                    <li @click="closeMenu">
                        <router-link to="/" exact>Home</router-link>
                    </li>
                    <li @click="closeMenu" v-for='category in categories'>
                        <router-link :to="{ name: 'category', params: { id: category.id, slug: category.slug }}">{{ category.name }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

import EventBus from 'src/event-bus/event-bus'

export default {
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    categories () {
      return this.$store.state.catalog.categories
    }
  },
  created () {
    const self = this
    EventBus.$on('toggle-sidebar-menu', () => {
      self.isOpen = !self.isOpen
    })
    this.$store.dispatch('catalog/loadCategories') // load store categories
  },
  methods: {
    closeMenu () {
      this.isOpen = false
      EventBus.$emit('toggle-overlay')
    }
  },
  mixins: [coreComponent('core/blocks/SidebarMenu/SidebarMenu')]
}
</script>

<style scoped>
.sidebar-menu {
    position: fixed;
    height: 100vh;
    width: 350px;
    background: #F2F2F2;
    top: 0;
    left: -350px;
    overflow: hidden;
}
.sidebar-menu.active {
    left: 0;
}
.close {
    cursor: pointer;
    background: white;
    text-align: right;
    display: inline-flex;
}
</style>
