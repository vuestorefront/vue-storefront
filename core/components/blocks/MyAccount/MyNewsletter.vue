<template>
  <div class="my-newsletter">
    Core My newsletter
  </div>
</template>

<script>
export default {
  name: 'MyNewsletter',
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      newsletterPreferences: {
        generalAgreement: false,
        men: false,
        women: false,
        kids: false,
        home: false
      },
      stateNewsletter: Object.assign({}, this.$store.state.user.newsletter)
    }
  },
  created () {
    this.$bus.$on('user-after-loggedin', () => {
      this.stateNewsletter = Object.assign({}, this.$store.state.user.newsletter)
      this.newsletterPreferences = this.getNewsletter()
    })
  },
  destroyed () {
    this.$bus.$off('user-after-loggedin')
  },
  mounted () {
    this.newsletterPreferences = this.getNewsletter()
  },
  methods: {
    edit () {
      this.$bus.$emit('myAccount.activateSection', 'newsletter')
    },
    objectsEqual (a, b) {
      const aProps = Object.keys(a)
      const bProps = Object.keys(b)

      if (aProps.length !== bProps.length) {
        return false
      }

      for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i]
        if (!b.hasOwnProperty(propName)) {
          return false
        } else {
          if (a[propName] !== null && b[propName] !== null && a[propName] === 'object' && b[propName] === 'object') {
            if (!this.objectsEqual(a[propName], b[propName])) {
              return false
            }
          } else if (a[propName] !== b[propName]) {
            return false
          }
        }
      }
      return true
    },
    updateNewsletter () {
      let updatedNewsletter
      if (!this.objectsEqual(this.newsletterPreferences, (this.stateNewsletter ? this.stateNewsletter : {}))) {
        updatedNewsletter = {
          action: 'unsubscribe',
          email: this.$store.state.user.current.email,
          preferences: Object.assign({}, this.newsletterPreferences)
        }
        for (let pref in this.newsletterPreferences) {
          if (this.newsletterPreferences[pref]) {
            updatedNewsletter.action = 'subscribe'
            break
          }
        }
      }
      this.exitSection(null, updatedNewsletter)
    },
    exitSection (event, updatedNewsletter) {
      this.$bus.$emit('myAccount.updatePreferences', updatedNewsletter)
      if (!updatedNewsletter) {
        this.newsletterPreferences = this.getNewsletter()
      }
    },
    getNewsletter () {
      if (this.stateNewsletter) {
        return {
          generalAgreement: this.stateNewsletter.generalAgreement ? this.stateNewsletter.generalAgreement : false,
          men: this.stateNewsletter.men ? this.stateNewsletter.men : false,
          women: this.stateNewsletter.women ? this.stateNewsletter.women : false,
          kids: this.stateNewsletter.kids ? this.stateNewsletter.kids : false,
          home: this.stateNewsletter.home ? this.stateNewsletter.home : false
        }
      } else {
        return {
          generalAgreement: false,
          men: false,
          women: false,
          kids: false,
          home: false
        }
      }
    }
  }
}
</script>
