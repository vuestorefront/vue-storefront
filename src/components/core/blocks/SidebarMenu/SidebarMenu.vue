<template>
  <div class="sidebar-menu" :class="{ active: isOpen }">
    <ul>
      <li @click="closeMenu" v-for='category in categories'>
        <router-link v-if='category.product_count >0 || category.children_data.length>0' :to="{ name: 'category', params: { id: category.id, slug: category.slug }}">{{ category.name }}</router-link>
        <ul v-if="category.children_data">
          <li @click="closeMenu" v-for='subcat in category.children_data'  style="display: none">
            <router-link :to="{ name: 'category', params: { id: subcat.id, slug: subcat.slug }}">{{ subcat.name }}</router-link>
        </li>
      </ul>
    </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'sidebar-menu',
  computed: {
    categories () {
      return this.$store.state.category.list.filter((op) => {
        return op.level === 2 // display only the root level (level =1 => Default Category)
      })
    },
    ...mapState({
      isOpen: state => state.ui.sidebar
    })
  },
  created () {
    this.$store.dispatch('category/list', {})
  },
  methods: {
    closeMenu () {
      this.$store.commit('setSidebar', false)
    }
  }
}
</script>
