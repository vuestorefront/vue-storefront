<template>
  <div id="category-list" class="t-container t-p-4" v-if="notEmpty">
    <h1>{{ parent.name }}</h1>
    <ul class="slingrope">
      <li :key="letter.letter" v-for="letter in categoriesGroupedByFirstLetter">
        <a :href="`#${ letter.anchor }`" v-html="letter.letter" v-scroll-to="`#${ letter.anchor }`" />
      </li>
    </ul>
    <ul class="slingrope-sidebar" :class="{ 'hidden': !scrollbarVisible }">
      <li :key="letter.letter" v-for="letter in verticalSlingropeLetters">
        <a :href="`#${ letter.anchor }`" v-html="letter.letter" v-scroll-to="`#${ letter.anchor }`" />
      </li>
    </ul>
    <ul class="letters">
      <li :key="letter.letter" v-for="letter in categoriesGroupedByFirstLetter" :id="letter.anchor" class="letter">
        <h2>{{ letter.letter }}</h2>
        <ul class="categories">
          <li :key="category.id" v-for="category in letter.list" class="category">
            <router-link
              :to="getCategoryRoute(category)"
              data-testid="categoryLink"
              v-html="category.name"
            />
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div v-else>
    <h1>No landing page found for ID {{ rootCategoryId }}</h1>
  </div>
</template>

<script>
import List from 'icmaa-category/components/List'
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'

export default {
  mixins: [ List ],
  data () {
    return {
      isScrolling: false,
      scrollbarVisible: false,
      scrollTop: 0,
      showFromY: 222
    }
  },
  computed: {
    verticalSlingropeLetters () {
      return this.categoriesGroupedByFirstLetter.length > 14
        ? this.categoriesGroupedByFirstLetter.filter((item, i) => (i === 0 || (i %= 2) === 1))
        : this.categoriesGroupedByFirstLetter
    }
  },
  beforeMount () {
    window.addEventListener('scroll', () => {
      this.isScrolling = true
    }, { passive: true })

    setInterval(this.hasScrolled, 50)
  },
  methods: {
    getCategoryRoute (category) {
      return formatCategoryLink(category)
    },
    hasScrolled () {
      if (this.isScrolling) {
        this.scrollTop = window.scrollY
        this.scrollbarVisible = (this.scrollTop > this.showFromY)
      }

      this.isScrolling = false
    }
  }
}
</script>

<style lang="scss">

@import '~theme/css/base/text';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$bg-secondary: color(secondary, $colors-background);

#category-list {

  .slingrope {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    width: calc(100% + 32px);
    padding: 0;
    margin: 0 -16px 2em;
    list-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: 768px) {
      width: 100%;
      margin: 0;
    }

    li {
      flex: 40px;
      flex-grow: 0;
      flex-shrink: 0;
      height: 40px;
      margin: 0 5px 6px 0;

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        background: #ffffff;
        border: 1px solid $bg-secondary;
        text-decoration: none;

        &:hover {
          background: transparent;
        }
      }
    }
  }

  .slingrope-sidebar {

    @media (min-width: 768px) {
      display: none;
    }

    position: fixed;
    right: 0;
    top: calc(50% - (335px / 2));
    margin: 0 10px 0;
    padding: 15px 8px;
    background: white;
    list-style: none;
    text-align: center;

    li {
      color: $bg-secondary;
      margin-bottom: 3px;

      &:last-child {
        margin-bottom: 0;
      }

      a {
        font-size: 12px;
      }
    }
  }

  .letters {
    list-style: none;
    padding: 0;
    margin-bottom: 25px;

    .letter {

      .categories {
        list-style: none;
        padding: 0;

        .category {
          margin-bottom: 10px;
        }
      }

      @media (min-width: 768px) {
        display: flex;

        &:not(:last-child) {
          border-bottom: 1px solid $bg-secondary;
          padding: 0 0 25px 0;
          margin: 0 0 25px 0;
        }

        &:first-child {
          margin-top: 25px;
        }

        h2 {
          flex-basis: 80px;
          flex-shrink: 0;
          flex-grow: 0;
          margin: 0 40px 0 0;
          text-align: right;
          line-height: 1em;
        }

        .categories {
          flex: auto 1 0;
          column-count: 5;

          .category {
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
</style>
