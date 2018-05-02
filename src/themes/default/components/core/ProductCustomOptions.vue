<template>
  <form class="custom-options">
    <div v-for="option in product.custom_options" :key="('customOption_' + option.option_id)">
      <div class="custom-option mb15">
        <label class="h4 pb10">{{ option.title }}</label>
        <input
          class="
            py10 w-100 border-box brdr-none brdr-bottom
            brdr-cl-primary h4 sans-serif
          "
          v-if="option.type === 'field'"
          type="text"
          :name="('customOption_' + option.option_id)"
          focus
          v-model="customOptions[('customOption_' + option.option_id)]"
          :placeholder="option.title"
          @change="optionChanged(option)">
        <div class="m5" v-for="opval in option.values" :key="opval.option_type_id" v-if="option.type === 'radio'">
          <input
            @change="optionChanged(option)"
            type="radio"
            class="m0 no-outline"
            :name="('customOption_' + option.option_id)"
            :id="('customOption_' + opval.option_type_id)"
            focus
            :value="opval.option_type_id"
            v-model="customOptions[('customOption_' + option.option_id)]"
          ><label class="pl10 lh20 h4 pointer" :for="('customOption_' + opval.option_type_id)" v-html="opval.title" />
        </div>
        <div class="m5" v-for="opval in option.values" :key="opval.option_type_id" v-if="option.type === 'checkbox'">
          <input
            @change="optionChanged(option)"
            type="checkbox"
            class="m0 no-outline"
            :name="('customOption_' + option.option_id)"
            :id="('customOption_' + opval.option_type_id)"
            focus
            :value="opval.option_type_id"
            v-model="customOptions[('customOption_' + option.option_id)]"
          ><label class="pl10 lh20 h4 pointer" :for="('customOption_' + opval.option_type_id)" v-html="opval.title" />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
import BaseInput from './blocks/Form/BaseInput.vue'
import BaseRadiobutton from './blocks/Form/BaseRadiobutton.vue'
import BaseCheckbox from './blocks/Form/BaseCheckbox.vue'

function _defaultOptionValue (co) {
  switch (co.type) {
    case 'radio': return co.values && co.values.length ? co.values[0].option_type_id : 0
    case 'checkbox': false; break
    default: return ''
  }
}
export default {
  name: 'ProductCustomOptions',
  mixins: [coreComponent('ProductCustomOptions')],
  components: {
    BaseInput,
    BaseRadiobutton,
    BaseCheckbox
  },
  methods: {
    optionChanged (option) {
      const customOptionsObject = []
      Object.keys(this.customOptions).forEach((key) => {
        customOptionsObject.push({
          option_id: key.replace('customOption_', ''),
          option_value: this.customOptions[key]
        })
      })
      this.$store.dispatch('product/setCustomOptions', { product: this.product, customOptions: customOptionsObject })
    }
  },
  data () {
    let dataObj = { customOptions: {} }
    for (let co of this.product.custom_options) {
      dataObj['customOptions']['customOption_' + co.option_id] = _defaultOptionValue(co)
    }
    return dataObj
  }
}
</script>
<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-tertiary: color(tertiary);
  $color-black: color(black);
  $color-hover: color(tertiary, $colors-background);

  .custom-option > label {
    font-weight: bold;
    margin-bottom: 10px;
  }
  input {
    transition: 0.3s all;
    &::-webkit-input-placeholder {
      color: $color-tertiary;
    }
    &::-moz-placeholder {
      color: $color-tertiary;
    }
    &:hover,
    &:focus {
      outline: none;
      border-color: $color-black;
    }
    background: inherit;
  }

  .icon {
    right: 6px;
    top: 10px;
    &:hover,
    &:focus {
      color: $color-hover;
    }
  }
</style>

