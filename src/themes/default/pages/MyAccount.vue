<template>
  <div id="my_account">
    <div class="bg-lightgray py35 pl20">
      <div class="container">
        <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" activeRoute="My Account" />
        <h1>My Account</h1>
      </div>
    </div>

    <div class="container pt45 pb70">
      <div class="row pl20 pt0">
        <div class="col-sm-3">
          <nav class="static-menu serif h4 mb35">
            <ul class="m0 p0">
              <li class="mb10" v-for="page in navigation"><router-link :to="page.link" class="c-black">{{page.title}}</router-link></li>
            </ul>
          </nav>
        </div>
        <div class="col-sm-9">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { corePage } from 'lib/themes'
  import Breadcrumbs from '../components/core/Breadcrumbs'

  export default {
    name: 'MyAccount',
    components: {
      Breadcrumbs
    },
    data () {
      return {
        navigation: [
          { title: 'My profile', link: '/my-account#profile' },
          { title: 'My shipping details', link: '/my-account#shipping_details' },
          { title: 'My newsletter', link: '/my-account#newsletter' },
          { title: 'My orders', link: '/my-account' },
          { title: 'My loyalty card', link: '/my-account' },
          { title: 'My product reviews', link: '/my-account' }
        ]
      }
    },
    mixins: [corePage('MyAccount')]
  }
</script>

<style scoped>

</style>