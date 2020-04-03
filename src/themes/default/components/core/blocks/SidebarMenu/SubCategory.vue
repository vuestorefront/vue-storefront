<template>
  <div>
    <ul
      v-if="children"
      class="sidebar-submenu absolute w-100 p0 bg-cl-primary"
      :style="styles"
    >
      <li
        v-if="parentSlug"
        class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary flex"
      >
        <router-link
          class="px25 py20 cl-accent no-underline col-xs"
          :to="categoryLink({ url_path: parentPath, slug: parentSlug })"
          data-testid="categoryLink"
        >
          {{ $t('View all') }}
        </router-link>
      </li>
      <li
        class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary flex"
        :key="link.slug"
        v-for="link in children"
      >
        <div
          v-if="isCurrentMenuShowed"
          class="subcategory-item"
        >
          <sub-btn
            v-if="link.children_count > 0"
            class="bg-cl-transparent brdr-none fs-medium"
            :id="link.id"
            :name="link.name"
          />
          <router-link
            v-else
            class="px25 py20 cl-accent no-underline col-xs"
            :to="categoryLink(link)"
          >
            {{ link.name }}
          </router-link>
        </div>
        <sub-category
          v-if="link.children_count > 0"
          :category-links="link.children_data"
          :id="link.id"
          :parent-slug="link.slug"
          :parent-path="link.url_path"
        />
      </li>
    </ul>
    <ul
      v-if="myAccountLinks && !hasChildren"
      class="sidebar-submenu absolute w-100 p0 bg-cl-primary"
      :style="styles"
    >
      <li
        class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary flex"
        :key="link.id"
        v-for="link in myAccountLinks"
        @click="notify(link.name)"
      >
        <router-link
          class="px25 py20 cl-accent no-underline col-xs"
          :to="localizedRoute(link.url)"
        >
          {{ link.name }}
        </router-link>
      </li>
      <li class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary flex">
        <a
          href="#"
          class="px25 py20 cl-accent no-underline col-xs"
          @click.prevent="logout"
        >
          {{ $t('Logout') }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SubBtn from './SubBtn.vue'
import i18n from '@vue-storefront/i18n'
import config from 'config'
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'

export default {
  name: 'SubCategory',
  components: {
    SubBtn
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    categoryLinks: {
      type: null,
      required: false,
      default: false
    },
    parentSlug: {
      type: String,
      required: false,
      default: ''
    },
    parentPath: {
      type: String,
      required: false,
      default: ''
    },
    myAccountLinks: {
      type: null,
      required: false,
      default: false
    }
  },
  computed: {
    children () {
      if (!config.entities.category.categoriesDynamicPrefetch && (this.categoryLinks && this.categoryLinks.length > 0 && this.categoryLinks[0].name)) { // we're using dynamic prefetching and getting just category.children_data.id from 1.7
        return this.categoryLinks
      } else {
        return this.$store.state.category.list.filter(c => { return c.parent_id === this.id }) // return my child categories
      }
    },
    hasChildren () {
      return this.children && this.children.length
    },
    ...mapState({
      submenu: state => state.ui.submenu,
      path: state => state.ui.submenu.path
    }),
    getSubmenu () {
      return this.submenu
    },
    styles () {
      const pos = this.submenu.path.indexOf(this.id)
      return pos !== -1 ? {
        zIndex: pos + 1
      } : false
    },
    isCurrentMenuShowed () {
      return this.getSubmenu && this.getSubmenu.depth && this.getSubmenu.path[this.getSubmenu.depth - 1] === this.id
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('user/logout', {})
      this.$router.push(this.localizedRoute('/'))
      this.$store.commit('ui/setSubmenu', { depth: false })
    },
    notify (title) {
      if (title === 'My loyalty card' || title === 'My product reviews') {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t('This feature is not implemented yet! Please take a look at https://github.com/DivanteLtd/vue-storefront/issues for our Roadmap!'),
          action1: { label: i18n.t('OK') }
        })
      }
    },
    categoryLink (category) {
      return formatCategoryLink(category)
    }
  }
}
</script>

<style scoped>
  .sidebar-submenu {
    left: 0;
    top: 0;
    min-height: 100%;
    transform: translateX(-100%);
  }

  .subcategory-item {
    display: flex;
    width: 100%;
  }
</style>
