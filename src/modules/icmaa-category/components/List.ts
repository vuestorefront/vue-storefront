import { mapGetters } from 'vuex'
import { CategoryStateCategory } from '../types/CategoryState'
import { extractPrefix } from '../helpers/fetchCategories'
import { isServer } from '@vue-storefront/core/helpers'
import { htmlDecode } from '@vue-storefront/core/store/lib/filters';

interface Letter {
  letter: string,
  anchor: string,
  list: CategoryStateCategory[]
}

export default {
  name: 'IcmaaCategoryList',
  computed: {
    ...mapGetters({ sortedListByParentId: 'icmaaCategory/sortedListByParentId' }),
    rootCategoryId (): number {
      return Number(this.$route.params.parentCategoryId)
    },
    depth (): number {
      return Number(this.$route.params.depth || this.$route.query.depth) || undefined
    },
    list: function (): CategoryStateCategory[] {
      return this.sortedListByParentId(this.rootCategoryId)
    },
    parent: function (): CategoryStateCategory {
      return this.list.parent
    },
    notEmpty: function (): boolean {
      return (this.list !== false)
    },
    categories: function (): CategoryStateCategory[] {
      return this.list.list.filter(category => category.is_active === true)
    },
    categoriesGroupedByFirstLetter: function (): Letter[] {
      let groups: Letter[] = []

      this.categories.forEach(category => {
        let firstChar: string = extractPrefix(category.name).charAt(0)
        let letter: string = /^[a-z]/gmi.test(firstChar) ? firstChar.toUpperCase() : '#'

        if (!groups.find(g => g.letter === letter)) {
          let anchor = letter !== '#' ? letter.toLowerCase() : 'numbers'
          groups.push({ letter, anchor, list: [] })
        }

        groups[groups.findIndex(g => g.letter === letter)].list.push(category)
      })

      return groups
    }
  },
  methods: {
    fetchCategories (): Promise<any> {
      if (this.rootCategoryId) {
        return this.$store.dispatch('icmaaCategory/list', { parentId: this.rootCategoryId, crawlDepth: this.depth })
      }
    }
  },
  async asyncData ({ store, route, context }) {
    if (!isServer) {
      await store.dispatch(
        'icmaaCategory/list',
        {
          parentId: route.params.parentCategoryId,
          crawlDepth: route.params.depth || route.query.depth
        }
      )
    }
  },
  serverPrefetch (): Promise<any> {
    return this.fetchCategories()
  },
  metaInfo () {
    return !this.notEmpty || {
      title: htmlDecode(this.parent.meta_title || this.parent.name),
      meta: this.parent.meta_description
        ? [{ vmid: 'description', name: 'description', content: htmlDecode(this.parent.meta_description) }]
        : []
    }
  }
}
