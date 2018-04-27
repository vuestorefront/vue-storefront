<template>
  <div class="sort-by">
    <i class="sort-by__icon material-icons">arrow_drop_down</i>

    <select
      name="sortby"
      v-model="sortby"
      @change="selected"
    >
      <option value="1">{{ $t('Price') }}: {{ $t('Low to high') }}</option>
      <option value="2">{{ $t('Price') }}: {{ $t('High to low') }}</option>
      <option value="3">{{ $t('Newest first') }}</option>
      <option value="4">{{ $t('Sale first') }}</option>
    </select>
  </div>
</template>

<script>
import {coreComponent} from 'core/lib/themes'

export default {
  mixins: [coreComponent('SortBy')],
  data () {
    return {
      sortby: this.$store.state.category.sortBy
    }
  },
  methods: {
    selected () {
      this.$store.commit('category/category/SORT', this.sortby)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/text';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-tertiary: color(tertiary);
.sort-by {
  display: inline-flex;
  position: relative;
  select {
    @extend .h4;
      padding: 10px 0;
      border: none;
      border-bottom: 1px solid $color-tertiary;
      width: 100%;
      -moz-appearance: none;
      -webkit-appearance: none;
      border-radius: 0;
      background-color: transparent;
      margin-right: 0;
      padding-right: 24px;
  }
  &__icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
