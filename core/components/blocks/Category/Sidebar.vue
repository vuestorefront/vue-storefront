<template>
  <div class="sidebar">
    <!--
    Category sidebar with filters
    props:
    {{ filters }} - Object wtth filters.
                    You don't need to pass all types of filters.
                    If filtertype.length is 0 the filter won't be displayed
                    (e.g. if 'color' array is empty or doesn't exist at all the color filters won't be displayed).
                    Please look at the example object:
                    {
                    "color": [
                      {"id":"49","label":"Black"}
                    ],
                    "size": [
                      {"id":"172","label":"28"}
                    ],
                    "price": [
                      {"id":"0.0-50.0","from":0,"to":50,"label":"< $50"}
                      ]
                    }
     -->
    Core category sidebar
  </div>
</template>

<script>
import ColorButton from '../../ColorButton.vue'
import SizeButton from '../../SizeButton.vue'
import PriceButton from '../../PriceButton.vue'

export default {
  name: 'CategorySidebar',
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  components: {
    ColorButton,
    SizeButton,
    PriceButton
  }
}
</script>
