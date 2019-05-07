<template>
  <div id="category">
    <div class="navbar">
      <div class="navbar__title desktop-only">
        <h2>Categories</h2>
      </div>
      <div class="navbar__controls">
        <SfButton
          class="navbar__filters-btn"
          :class="{ 'navbar__filters-btn--active': isFilterSidebarOpen }"
          @click="isFilterSidebarOpen = true"
        >
          <FiltersIcon />
          Filters
        </SfButton>
        <span class="navbar__products-count"><strong>256</strong> items</span>
      </div>
    </div>

      <div class="main">
      <div class="sidebar desktop-only">
        <SfAccordion :open="true">
          <h3 slot="label">Clothing</h3>
          <SfList slot="content" class="sidebar__category-list">
            <SfListItem>
              <SfMenuItem label="All" count="280" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="Skirts" count="23" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="Sweaters" count="54" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="Dresses" count="34" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="T-shirts" count="56" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="Pants" count="7" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="Underwear" count="12" />
            </SfListItem>
          </SfList>
        </SfAccordion>
        <SfAccordion>
          <h3 slot="label">Accesorries</h3>
          <SfList slot="content" class="sidebar__category-list">
            <SfListItem>
              <SfMenuItem label="All" count="280" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="Skirts" count="23" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="Sweaters" count="54" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="Dresses" count="34" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="T-shirts" count="56" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="Pants" count="7" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="Underwear" count="12" />
            </SfListItem>
          </SfList>
        </SfAccordion>
        <SfAccordion>
          <h3 slot="label">Shoes</h3>
          <SfList slot="content" class="sidebar__category-list">
            <SfListItem>
              <SfMenuItem label="All" count="280" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="Skirts" count="23" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="Sweaters" count="54" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="Dresses" count="34" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="T-shirts" count="56" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="Pants" count="7" />
            </SfListItem>
            <SfListItem>
              <SfMenuItem label="Underwear" count="12" />
            </SfListItem>
          </SfList>
        </SfAccordion>
      </div>
      <div class="products">
        <!-- <SfProductCard
          class="products__product-card"
          v-for="i in 6"
          :key="i"
          title="Cream Beach Bag"
          :price="{ regularPrice: '10,99 $' }"
          :rating="{ max: 5, score: 4 }"
        />
        <SfPagination
          class="products__pagination"
          :current.sync="currentPage"
          :total="20"
          :visible="5"
        /> -->
      </div>
    </div>

     <SfSidebar
      :visible="isFilterSidebarOpen"
      @close="isFilterSidebarOpen = false"
    >
      <h3>Collection</h3>
      <SfList>
        <SfListItem>
          <SfFilter
            :group.sync="filters.collection"
            label="Summer fly"
            value="summer-fly"
            count="10"
          />
        </SfListItem>
        <SfListItem>
          <SfFilter
            :group.sync="filters.collection"
            label="Best 2018"
            value="best-2018"
            count="23"
          />
        </SfListItem>
        <SfListItem>
          <SfFilter
            :group.sync="filters.collection"
            label="Your choice"
            value="your-choice"
            count="54"
          />
        </SfListItem>
      </SfList>
      <h3>Color</h3>
      <SfList>
        <SfListItem>
          <SfFilter
            :group.sync="filters.color"
            label="Red"
            value="red"
            color="#990611"
          />
        </SfListItem>
        <SfListItem>
          <SfFilter
            :group.sync="filters.color"
            label="Yellow"
            value="yellow"
            color="#DCA742"
          />
        </SfListItem>
        <SfListItem>
          <SfFilter
            :group.sync="filters.color"
            label="Black"
            value="black"
            color="black"
          />
        </SfListItem>
        <SfListItem>
          <SfFilter
            :group.sync="filters.color"
            label="Blue"
            value="blue"
            color="#004F97"
          />
        </SfListItem>
        <SfListItem>
          <SfFilter
            :group.sync="filters.color"
            label="White"
            value="white"
            color="white"
          />
        </SfListItem>
      </SfList>
    </SfSidebar>
  </div>
</template>

<script>
import SfSidebar from "@storefrontui/vue/dist/SfSidebar.vue";
import SfButton from "@storefrontui/vue/dist/SfButton.vue";
import SfList from "@storefrontui/vue/dist/SfList.vue";
import SfFilter from "@storefrontui/vue/dist/SfFilter.vue";
import SfMenuItem from "@storefrontui/vue/dist/SfMenuItem.vue";
import SfAccordion from "@storefrontui/vue/dist/SfAccordion.vue";

import FiltersIcon from "../components/FiltersIcon.vue"
// temporary, check why it's not installed globally. Probably because of vue versions mismatch - remove vue from deps in sfui
import SfListItem from "@storefrontui/vue/dist/SfListItem.vue";
export default {
  data () {
    return {
      isFilterSidebarOpen: false,
      filters: {
        color: null,
        collection: null
      },
    }
  },
  components: {
    SfButton,
    SfList,
    SfFilter,
    SfListItem,
    SfSidebar,
    SfMenuItem,
    SfAccordion,
    FiltersIcon
  }
}
</script>


<style lang="scss" scoped>
@import "~@storefrontui/vue/dist/css/_variables.scss";

# #!/usr/bin/env sh

# # abort on errors
# set -e

# # build
# npm run docs:build

# # navigate into the build output directory
# cd .vuepress/dist

# # if you are deploying to a custom domain
# # echo 'www.example.com' > CNAME

# git init
# git add -A
# git commit -m 'deploy'

# # if you are deploying to https://<USERNAME>.github.io
# # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# # if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:DivanteLtd/vue-storefront.git master:gh-pages

# cd -

#category {
  box-sizing: border-box;
  max-width: 1200px;
  margin: auto;
  overflow: hidden;
}

.navbar {
  border-top: 1px solid $c-border;
  border-bottom: 1px solid $c-border;
  padding: $spacer 0;
  &__title {
    display: inline-flex;
    align-items: center;
    border-right: 1px solid $c-border;
    width: 20%;
    box-sizing: border-box;
  }
  &__controls {
    display: inline-flex;
    padding-left: $spacer-big;
    padding-right: $spacer-big;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    @media (min-width: $desktop-min) {
      padding-left: $spacer-extra-big;
      padding-right: $spacer-extra-big;
      height: 75px;
      width: calc(80% - 4px)
    }
  }
  &__filters-btn {
    color: white;
    color: inherit;
    font-size: $font-size-small-desktop;
    text-transform: none;
    background: transparent;
    padding: 0;
    align-items: center;
    display: flex;
    svg {
      margin-right: 10px;
      fill: $c-gray-secondary;
    }
    &:hover,
    &--active {
      color: $c-accent-primary;
      svg {
        fill: $c-accent-primary;
      }
    }
  }
  @media (min-width: $desktop-min) {
    height: 75px;
    padding: 0;
  }
}

.main {
  display: flex;
}

.sidebar {
  border-right: 1px solid $c-border;
  padding-right: $spacer-extra-big;
  width: 20%;
  box-sizing: border-box;
  &__category-list li:hover,
  &__category-item--active {
    text-decoration: underline;
    font-weight: 500;
    cursor: pointer;
  }
}

.products {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  &__product-card {
    width: 50%;
    justify-content: center;
    @media (min-width: $tablet-min) {
      width: 33%;
    }
    @media (min-width: $desktop-min) {
      width: 25%;
    }
  }
  &__pagination {
    @media (min-width: $desktop-min) {
      padding-top: $spacer-extra-big;
    }
  }
  @media (min-width: $desktop-min) {
    width: 80%;
    padding: $spacer-big;
  }
}
</style>
