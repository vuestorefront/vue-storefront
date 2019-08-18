<template>
  <SfAccordion :first-open="true">
    <!-- If there are no children show sibilings -->
    <SfAccordionItem
      v-for="(cat, i) in (hasChildren ? 
        filterCategories(currentCategory.level+1, currentCategory.id) : filterCategories(currentCategory.level, currentCategory.parent_id))"
      :key="i"
      :header="cat.name"
    >
      <SfList>
        <SfListItem>
          <router-link :to="formatCategoryLink(cat)">
            <SfMenuItem
              class="menu-item"
              label="All"
            />
          </router-link>
        </SfListItem>
        <SfListItem v-for="(catChildren, j) in filterCategoryChildren(cat.id)" :key="j">
          <router-link :to="formatCategoryLink(catChildren)">
            <SfMenuItem
              class="menu-item"
              :label="catChildren.name"
            />
          </router-link>
        </SfListItem>
      </SfList>
    </SfAccordionItem>
  </SfAccordion>
</template>

<script>
import { SfAccordion, SfList, SfMenuItem } from '@storefrontui/vue';
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'

export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    currentCategory: {
      type: Object,
      default: () => {}
    }
  },
  computed : {
    hasChildren () {
      return this.categories.filter(category => this.currentCategory.level+1 === category.level && category.parent_id === this.currentCategory.id).length !== 0
    },
    parentCategory () {
      return this.categories.filter(category => category.id === this.currentCategory.parent_id)[0]
    },
  },
  methods: {
    formatCategoryLink (category) {
      return formatCategoryLink(category)
    },
    filterCategories (level, parentId) {
      return this.categories.filter(category => category.level === level && category.parent_id === parentId)
    },
    filterCategoryChildren (parentId) {
      return this.categories.filter(category => category.parent_id === parentId)
    },
  },
  components: {
    SfAccordion,
    SfList,
    SfMenuItem
  }
};
</script>

<style lang="scss" scoped>
// todo: move to sfui
.menu-item {
  &--active,
  &:hover {
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
