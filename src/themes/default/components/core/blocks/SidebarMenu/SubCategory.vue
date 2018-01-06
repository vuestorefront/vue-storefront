<template>
  <ul v-if="links" class="sidebar-submenu p0" v-bind:style="styles">
    <li class="brdr-bottom brdr-c-lightgray bg-white flex" v-bind:key="link.slug" v-for="link in links">
      <router-link class="px25 py20 c-black no-underline col-xs" :to="{ name: 'category', params: { id: link.id, slug: link.slug }}">{{ link.name }}</router-link>
      <sub-btn class="flex-end center-self" :id="link.id" v-if="link.children_data.length"></sub-btn>
      <sub-category :links="link.children_data" :id="link.id" v-if="link.children_data.length"/>
    </li>
  </ul>
</template>
<script>
import { mapState } from 'vuex'
import SubBtn from './SubBtn.vue'

export default {
  name: 'sub-category',
  components: {
    SubBtn
  },
  props: {
    id: {
      required: true
    },
    links: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState({
      submenu: state => state.ui.submenu
    }),
    styles () {
      const pos = this.submenu.path.indexOf(this.id)
      return pos !== -1 ? {
        zIndex: pos + 1
      } : false
    }
  }
}
</script>
<style scoped>
  .sidebar-submenu {
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100%;
    width: 100%;
    transform: translateX(-100%);
    background: #fff;
  }
</style>
