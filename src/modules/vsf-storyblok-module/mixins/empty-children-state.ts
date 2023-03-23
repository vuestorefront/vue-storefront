import { Blok } from '../components';

export default Blok.extend({
  data () {
    let childrenItemsEmptyState: Record<string, boolean> = {};

    return {
      childrenItemsEmptyState
    }
  },
  computed: {
    isAllChildrenEmpty (): boolean {
      const values = Object.values(this.childrenItemsEmptyState);

      if (!values.length) {
        return false;
      }

      return !values.some((isEmpty) => !isEmpty);
    }
  },
  methods: {
    onChildContentChange ({ isEmpty, itemId }: {isEmpty: boolean, itemId: string}): void {
      this.$set(this.childrenItemsEmptyState, itemId, isEmpty);
    }
  }
});
