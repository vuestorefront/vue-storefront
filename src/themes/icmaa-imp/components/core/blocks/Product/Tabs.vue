<template>
  <div>
    <div class="t-flex t-flex t-overflow-scroll t-webkit-touch">
      <span v-for="(tab, key) in tabs" :key="key" @click="setCurrent(tab)" class="t-flex-fix t-text-sm t-pb-3 t-px-4 t-border-b t-cursor-pointer t-select-none t-webkit-tap-transparent" :class="{ 't-text-primary t-border-primary': isActive(tab), 't-border-base-lightest': !isActive(tab), 't-pl-2': key === 0, 't-mr-2px': tab !== last }">
        <slot :name="'pill-' + tab" />
      </span>
      <span class="t-flex-grow t-border-b-base-lightest t-border-b" />
    </div>
    <div v-for="(tab, key) in tabs" :key="key" v-show="isActive(tab)" class="t-pt-8">
      <slot :name="'tab-' + tab" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: this.tabs[0]
    }
  },
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    last () {
      return this.tabs[this.tabs.length - 1]
    }
  },
  methods: {
    setCurrent (tab) {
      this.current = tab
    },
    isActive (tab) {
      return this.current === tab
    }
  }
}

</script>
