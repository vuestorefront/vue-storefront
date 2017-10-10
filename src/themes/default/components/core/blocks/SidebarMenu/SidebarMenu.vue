<template>
    <div class="sidebar-menu bg-lightgray" :class="{ active: isOpen }">
        <div class="row">
            <div class="col-md-12 close bg-white align-right end-xs" @click="closeMenu">
                <i class="material-icons p15">close</i>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 h4 serif">
                <ul class="p0 m0">
                    <!-- TO-DO: Remove closemenu and handle it via store -->
                    <li @click="closeMenu" class="px25 py20 brdr-underline brdr-c-darkgray bg-white">
                        <router-link to="/" exact>Home</router-link>
                    </li>
                    <li class="px25 py20 brdr-underline brdr-c-darkgray bg-white" @click="closeMenu" v-for='category in categories'>
                        <router-link :to="{ name: 'category', params: { id: category.id, slug: category.slug }}">{{ category.name }}</router-link>
                        <ul v-if="category.children_data" class="p0">
                            <li @click="closeMenu" v-for='subcat in category.children_data'  style="display: none">
                                <router-link :to="{ name: 'category', params: { id: subcat.id, slug: subcat.slug }}">{{ subcat.name }}</router-link>
                            </li>
                        </ul>
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
      return this.$store.state.category.list.filter((op) => {
        return op.level === 2 // display only the root level (level =1 => Default Category)
      })
    }
  },
  created () {
    const self = this
    EventBus.$on('toggle-sidebar-menu', () => {
      self.isOpen = !self.isOpen
    })
    this.$store.dispatch('category/list', {})
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
ul {
    list-style-type: none;
}

.sidebar-menu {
    height: 100vh;
    width: 350px;
    left: -350px;
    overflow: hidden;
    position: fixed;
    top: 0;
}
.sidebar-menu.active {
    left: 0;
}
.close {
    cursor: pointer;
    display: inline-flex;
}
a {
    display: block;
    color: black;
}
li:hover {
    background-color: #F2F2F2;
}
</style>
