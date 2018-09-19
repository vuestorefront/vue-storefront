<template>
  <div>
    <div
      v-for="(review) in reviews"
      :key="review.id"
    >
      <p>Nickname: {{ review.nickname }}</p>
      <p>Title: {{ review.title }}</p>
      <p>Detail: {{ review.detail }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: null,
      required: true
    }
  }
}
</script>
