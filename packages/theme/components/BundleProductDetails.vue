<template>
  <div>
    <SfList>
      <SfListItem v-for="(section, index) in productOptions" :key="section.id">
        <SfMenuItem :label="section.attributeName" />
        <SfRadio
          v-for="option in section.values"
          :key="option.id"
          :label="option.name"
          :value="option.id"
          v-model="selected[index][section.id].option"
          @input="$emit('input', selected)"
        />
        <SfInput
          v-model="selected[index][section.id].qty"
          @input="$emit('input', selected)"
          label="Quantity"
          :required="true"
        />
      </SfListItem>
    </SfList>
  </div>
</template>

<script>
import {
  SfRadio,
  SfList,
  SfMenuItem,
  SfInput
} from "@storefront-ui/vue";
import { watch, ref, reactive, toRefs } from '@vue/composition-api'

const createInitialValues = (productOptions) =>
  productOptions.reduce((prev, curr) => ([...prev, { [curr.id]: { option: curr.values[0].id, qty: "1" } } ]), [])

export default {
  props: {
    productOptions: Array,
  },
  setup ({ productOptions }, { emit }) {
    const selected = reactive(createInitialValues(productOptions))

    return {
      selected,
    }
  },
  components: {
    SfRadio,
    SfList,
    SfMenuItem,
    SfInput
  }
}
</script>

