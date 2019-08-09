<template>
  <SfAccordion :first-open="true">
      <SfAccordionItem
        v-for="(parentCategory, i) in filterCategories(currentCategory.level+1, currentCategory.id)"
        :key="i"
        :header="parentCategory.name"
      >
        <SfList>
          <SfListItem v-for="(category, j) in filterCategoryChildren(parentCategory.id)" :key="j">
            <SfMenuItem
              class="menu-item"
              :label="category.name"
            />
          </SfListItem>
        </SfList>
      </SfAccordionItem>
  </SfAccordion>
</template>

<script>
import { SfAccordion, SfList, SfMenuItem } from '@storefrontui/vue';

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
  methods: {
    filterCategories (level, parentId) {
      return this.categories.filter(category => category.level === level && category.parent_id === parentId)
    },
    filterCategoryChildren (parentId) {
      return this.categories.filter(category => category.parent_id === parentId)
    }
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
