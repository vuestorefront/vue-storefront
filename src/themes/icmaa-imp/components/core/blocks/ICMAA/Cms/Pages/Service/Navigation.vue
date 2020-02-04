<template>
  <nav role="service-navigation">
    <ul>
      <li class="t-w-full t-relative">
        <a class="t-block lg:t-hidden t-bg-white t-border-base-light t-border t-px-3 t-py-2 t-appearance-none focus:outline-none t-text-black focus:shadow-outline t-cursor-pointer" @click="toggleView">Service
          <div class="t-pointer-events-none t-absolute t-inset-y-0 t-right-0 t-flex t-items-center t-px-2"><i class="material-icons t-text-2xl">keyboard_arrow_down</i></div>
        </a>
        <ul class="t-hidden lg:t-block lg:t-bg-transparent t-relative t-w-full">
          <li v-for="(item, index) in navigation" :key="index" class="t-border-b t-border-base-lighter">
            <router-link :to="localizedRoute(item.path)" class="t-flex t-text-black t-px-3 t-py-2 t-text-sm">
              {{ item.label }}
            </router-link>
          </li>
        </ul>
        <ul v-if="show" class="lg:t-hidden t-bg-white t-absolute t-w-full t-z-10 t-border-l t-border-r t-border-base-light">
          <li v-for="(item, index) in navigation" :key="index" class="t-border-b t-border-base-light" @click="toggleView">
            <router-link :to="localizedRoute(item.path)" class="t-flex t-text-black t-px-3 t-py-2 t-text-sm">
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ServiceNavigation',
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters('icmaaCmsBlock', ['getJsonBlockByIdentifier']),
    block () {
      return this.getJsonBlockByIdentifier('service-navigation')
    },
    navigation () {
      return this.block.navigation || []
    }
  },
  methods: {
    toggleView () {
      this.show = !this.show
      this.$emit('toggle', this.show)
    }
  }
}
</script>
