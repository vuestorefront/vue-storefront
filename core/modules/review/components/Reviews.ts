export const Reviews = {
  computed: {
    reviews () : any[] {
      return this.$store.state.review.items.items || []
    }
  }
}
