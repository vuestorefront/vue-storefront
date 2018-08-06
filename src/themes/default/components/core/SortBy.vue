<template>
  <div class="sort-by">
    <i @click="changeDirection" v-if="direction === 'asc'" :class="{'disabled' : sortby === ''}" class="cl-secondary sort-by__icon material-icons">arrow_drop_down</i>
    <i @click="changeDirection" v-else :class="{'disabled' : sortby === ''}" class="cl-secondary sort-by__icon material-icons">arrow_drop_up</i>
    <select
      name="sortby"
      class="cl-secondary"
      v-model="sortby"
      @change="changeOrder">
      <option selected="selected" disabled value="">{{ $t('Sort By') }}</option>
      <option v-for="(option, label) in sortByAttribute" :disabled="sortby === option" :value="option" :key="option" >{{ $t(label) }}</option>
    </select>
  </div>
</template>

<script>
import SortBy from '@vue-storefront/core/components/SortBy'
export default {
  mixins: [SortBy]
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
        border-bottom: 1px solid $color-tertiary;
        padding-right: 30px;
        select {
            @extend .h4;
            padding: 10px 0;
            font-size: 14px;
            border: none;
            width: 100%;
            -moz-appearance: none;
            -webkit-appearance: none;
            border-radius: 0;
            background-color: transparent;
            margin-right: 0;
            &:focus {
                outline: none;
            }
        }
        &__icon {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
        }
    }
    @media (max-width: 770px) {
      .sort-by {
        width: 100%;
      }
    }
</style>
