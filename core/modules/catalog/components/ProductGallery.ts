export const ProductGallery = {
  name: 'ProductGallery',
  props: {
    gallery: {
      type: Array,
      required: true
    },
    configuration: {
      type: Object,
      required: true
    },
    offline: {
      type: Object,
      required: false
    },
    product: {
      type: Object,
      required: true
    }
  }
}
