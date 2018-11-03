export const Reviews = {
  name: 'Reviews',
  computed: {
    reviews () : any[] {
      return this.$store.state.review.items.items || []
    }
  }
}
