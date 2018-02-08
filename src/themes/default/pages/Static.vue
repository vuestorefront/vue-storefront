<template>
  <div>
    <div class="bg-lightgray py35 pl20">
      <div class="container">
        <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" :active-route="$props.title" />
        <h2>{{ $props.title }}</h2>
      </div>
    </div>

    <div class="container pt45 pb70">
      <div class="row pl20 pt0">
        <div class="col-sm-3">
          <nav class="static-menu serif h4 mb35">
            <ul class="m0 p0">
              <li class="mb10" v-for="page in navigation" :key="page.id">
                <router-link :to="page.link" class="c-darkgray relative">{{ page.title }}</router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="static-content h4 lh35 col-sm-9">
          <static-content :file="$props.page"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '../components/core/Breadcrumbs'
import Meta from 'src/lib/meta'
import staticContent from 'theme/components/theme/StaticContent'

export default {
  components: {
    Breadcrumbs,
    staticContent
  },
  props: {
    title: {
      type: String,
      required: true
    },
    page: {
      type: String,
      required: true
    }
  },
  mixins: [Meta],
  meta () {
    return {
      title: this.$props.title
    }
  },
  data () {
    return {
      navigation: [
        { title: 'About us', link: '/about-us' },
        { title: 'Customer service', link: '/customer-service' },
        { title: 'Store locator', link: '/store-locator' },
        { title: 'Delivery', link: '/delivery' },
        { title: 'Return policy', link: '/returns' },
        { title: 'Privacy policy', link: '/privacy' },
        { title: 'Contact us', link: '/contact' }
      ]
    }
  },
  watch: {
    '$route': 'validateRoute'
  },
  methods: {
    validateRoute () {
      this.setMeta()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/global_vars';
  $lightgray-secondary: map-get($colors, lightgray-secondary);

  .static-menu {
    ul {
      list-style: none;
    }

    a::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: $lightgray-secondary;
    }

    a:hover::after,
    .router-link-active::after {
      opacity: 0;
    }
  }

  .static-content {
    *:first-of-type {
      margin-top: 0;
    }
  }
</style>
