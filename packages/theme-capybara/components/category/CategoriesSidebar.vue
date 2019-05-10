<template>
  <SfAccordion>
    <SfAccordionItem :open="index === 0" v-for="(category, index) in categories" :key="category.id">
      <h3 slot="label">{{ category.name}}</h3>
      <SfList slot="content" class="sidebar__category-list">
        <SfListItem>
          <SfMenuItem label="All"/>
        </SfListItem>
      </SfList>
    </SfAccordionItem>
  </SfAccordion>
</template>

<script>
import SfList from "@storefrontui/vue/dist/SfList.vue";
import SfListItem from "@storefrontui/vue/dist/SfListItem.vue";
import SfMenuItem from "@storefrontui/vue/dist/SfMenuItem.vue";
import SfAccordion from "@storefrontui/vue/dist/SfAccordion.vue";
import SfAccordionItem from "@storefrontui/vue/dist/SfAccordionItem.vue";

export default {
  props: {
    categories: {
      required: true,
      type: Array
    }
  },
  components: {
    SfList,
    SfListItem,
    SfMenuItem,
    SfAccordion,
    SfAccordionItem
  }
};
</script>
