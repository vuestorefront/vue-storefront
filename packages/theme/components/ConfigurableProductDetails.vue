<template>
  <div>
    <SfSelect v-model="size" @change="handleChange" label="Size" class="sf-select--bordered product-details__attribute">
      <SfSelectOption v-for="size in possibleOptions.sizes" :key="size.value" :value="size.value">
        <SfProductOption :label="size.label" />
      </SfSelectOption>
    </SfSelect>
    <SfSelect v-model="color" @change="handleChange" label="Color" class="sf-select--bordered product-details__attribute">
      <SfSelectOption v-for="color in possibleOptions.colors" :key="color.value" :value="color.value">
        <SfProductOption :label="color.label" :color="color.color" />
      </SfSelectOption>
    </SfSelect>
  </div>
</template>

<script>
import {
  SfSelect,
  SfProductOption
} from "@storefront-ui/vue";
import { computed, ref, watch } from '@vue/composition-api'

export default {
  props: {
    productOptions: Array,
  },
  setup ({ productOptions }, { emit }) {
    const possibleOptions = computed(() => {
      const sizeOptions = productOptions.find(o => o.attributeName === 'size')
      const colorOptions = productOptions.find(o => o.attributeName === 'color')

      return {
        sizeAttribute: sizeOptions ? sizeOptions.id : null,
        colorAttribute: colorOptions ? colorOptions.id : null,
        sizes: sizeOptions ? sizeOptions.values.map(o => ({ label: o.name, value: String(o.id) })) : [],
        colors: colorOptions ? colorOptions.values.map(o => ({ label: o.name, value: String(o.id), color: "#990611" })) : []
      }
    })
    const color = ref(possibleOptions.value.colors[0].value)
    const size = ref(possibleOptions.value.sizes[0].value)

    const handleChange = () => {
      const configuration = [
        { [possibleOptions.value.sizeAttribute]: size.value },
        { [possibleOptions.value.colorAttribute]: color.value }
      ]
      emit('input', configuration)
    }

    return {
      possibleOptions,
      handleChange,
      color,
      size
    }
  },
  components: {
    SfSelect,
    SfProductOption
  }
}
</script>

