<template>
  <div id="category-list" class="t-container t-px-4 t-my-8" v-if="notEmpty">
    <h1>{{ parent.name }}</h1>
    <div class="t-flex t-flex-wrap t--mx-4">
      <div class="t-w-full">
        <teaser :tags="teaserTag" :show-large="false" :show-small-in-row="true" />
      </div>
    </div>
    <lazy-hydrate when-idle>
      <logo-line :parent-id="rootCategoryId" :limit="12" :placeholder="true" column-class="t-w-1/3 md:t-w-1/6 t-py-2" class="t-justify-between t-my-8" />
    </lazy-hydrate>
    <ul class="slingrope t-flex t-overflow-auto t-scrolling-touch">
      <li :key="letter.letter" v-for="letter in categoriesGroupedByFirstLetter">
        <a :href="`#${ letter.anchor }`" v-html="letter.letter" v-scroll-to="`#${ letter.anchor }`" class="t-flex t-px-4 t-py-2 t-bg-white t-border-r t-border-b t-border-base-lightest t-font-mono" />
      </li>
    </ul>
    <ul class="letters t-px-2">
      <li :key="letter.letter" v-for="letter in categoriesGroupedByFirstLetter" :id="letter.anchor" class="t-p-4 t-py-8 t-bg-white t-my-4 t-flex t--mx-2">
        <h2 class="t-w-2/12 lg:t-w-1/12 t-px-2 t-pr-6 t-py-1 t-text-right t-text-3xl t-font-bold">
          {{ letter.letter }}
        </h2>
        <ul class="t-w-10/12 lg:t-w-11/12 t-px-2">
          <li :key="category.id" v-for="category in letter.list" class="category t-inline-block t-w-full t-leading-snug t-py-1">
            <router-link
              :to="getCategoryRoute(category)"
              data-testid="categoryLink"
              v-html="category.name"
              class="t-block"
              :class="[ category.ceCluster === cluster ? 't-text-primary t-font-bold' : 't-text-base-tone' ]"
            />
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div v-else>
    No landing page found for ID {{ rootCategoryId }}
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import List from 'icmaa-category/components/List'
import LogoLine from 'theme/components/core/blocks/CategoryExtras/LogoLine'
import Teaser from 'theme/components/core/blocks/Teaser/Teaser'
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'

export default {
  mixins: [ List ],
  components: {
    LogoLine,
    Teaser,
    LazyHydrate
  },
  methods: {
    getCategoryRoute (category) {
      return formatCategoryLink(category)
    }
  },
  computed: {
    teaserTag () {
      return String(this.$route.params.teaserTag)
    }
  }
}
</script>

<style lang="scss">

#category-list {
  .letters li > ul {
    @media (min-width: 767px) {
      column-count: 5;
      column-gap: 2rem;
      break-inside: avoid;
    }
  }
}

</style>
