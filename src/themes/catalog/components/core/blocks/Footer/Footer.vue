<template>
  <footer class="footer">

    <div class="flex center-xs bg-secondary py70 ">
      <div class="container">
        <div class="row center-xs">
          <div class="col-md-8 center-xs">
            <NewsletterSubscribeForm />
          </div>
        </div>
      </div>
    </div>

    <div class="container py70">
      <div class="row">
        <div v-for="box in boxes" :key="box.title" class="col-xs-12 col-md-4">
          <router-link :to="box.link">
            <box :title="box.title" :content="box.content" :icon="box.icon" />
          </router-link>
        </div>
      </div>
    </div>

  </footer>
</template>

<script>
import NewsletterSubscribeForm from 'theme/components/theme/NewsletterSubscribeForm'
import Box from 'theme/components/theme/blocks/Footer/Box'

export default {
  data () {
    return {
      boxes: [{
        title: 'Call center',
        content: '1-312-231-21-42',
        icon: 'phone',
        link: '/'
      }, {
        title: 'Online assistance',
        content: 'Chat with us',
        icon: 'chat',
        link: '/'
      }, {
        title: 'Local stores',
        content: 'Find a store',
        icon: 'store',
        link: '/'
      }]
    }
  },
  components: {
    NewsletterSubscribeForm,
    Box
  }
}
</script>
