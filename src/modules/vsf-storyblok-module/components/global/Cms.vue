<template>
  <div>
    <slot v-if="loading" name="loading"/>
    <slot v-else-if="error" name="error"/>
    <slot v-else/>
  </div>
</template>

<script>
import config from 'config'
import fetch from 'isomorphic-fetch'
import { processURLAddress } from '@vue-storefront/core/helpers'
import { loadScript } from '../../helpers'

export default {
  name: 'StoryblokCms',
  data () {
    return {
      loading: true,
      error: false,
      story: null
    }
  },
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value.content ? value.content : value)
    },
    async fetchStory () {
      const url = processURLAddress(`${config.storyblok.endpoint}/get-by-uuid?uuid=${this.uuid}`)
      const response = await fetch(url)
      const json = await response.json()
      this.loading = false
      if (json.stories && json.stories[0]) {
        this.updateValue(json.stories[0])
        return json.stories[0]
      } else {
        this.error = true
      }
    }
  },
  async serverPrefetch () {
    const story = await this.fetchStory()
    return { story }
  },
  async mounted () {
    if (!this.story) {
      await this.fetchStory()
    }

    if (this.previewToken) {
      const url = `https://app.storyblok.com/f/storyblok-latest.js?t=${this.previewToken}`

      await loadScript(url, 'storyblok-javascript-bridge')

      window['storyblok'].on(['input', 'published', 'change'], (event) => {
        if (event.action === 'input') {
          this.updateValue(event.story)
        }
      })
    }
  }
}
</script>
