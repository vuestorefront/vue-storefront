<template>
  <div class="my-newsletter mb35">
    <!-- My newsletter header -->
    <div class="row mb15">
      <div class="col-xs-12 col-md-6" :class="{ 'c-darkgray' : !isActive }">
        <h3 class="m0 mb5">My newsletter</h3>
      </div>
      <div class="col-xs-12 col-md-6 pr30">
        <div class="lh30 flex end-md" v-if="!isActive && editMode">
          <a href="#" class="c-lightgray-secondary flex" @click.prevent="edit">
            <span class="pr5">Edit newsletter preferences</span>
            <i class="material-icons c-lightgray-secondary">edit</i>
          </a>
        </div>
      </div>
    </div>

    <!-- My newsletter body (both modes) -->
    <div class="row">
      <div class="col-xs-12">
        <h4>General agreement</h4>
      </div>
      <div class="col-xs-12 col-md-12 mb15">
        <div class="checkboxStyled">
          <input type="checkbox" v-model="newsletterPreferences.generalAgreement" id="generalAgreement" :disabled="!isActive">
          <label for="generalAgreement"></label>
        </div>
        <div class="checkboxText ml15 lh25" @click="isActive ? newsletterPreferences.generalAgreement = !newsletterPreferences.generalAgreement : null">
          <span class="fs16 c-darkgray">I want to receive a newsletter, and agree to its terms</span>
        </div>
      </div>
      <div class="col-xs-12">  
        <h4>Preferences</h4>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-3 preferences mb25">
        <div class="checkboxStyled">
          <input type="checkbox" v-model="newsletterPreferences.men" id="men" :disabled="!isActive">
          <label for="men"></label>
        </div>
        <div class="checkboxText ml15 lh25" @click="isActive ? newsletterPreferences.men = !newsletterPreferences.men : null">
          <span class="fs16 c-darkgray">Men</span>
        </div>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-3 mb25">
        <div class="checkboxStyled">
          <input type="checkbox" v-model="newsletterPreferences.women" id="women" :disabled="!isActive">
          <label for="women"></label>
        </div>
        <div class="checkboxText ml15 lh25" @click="isActive ? newsletterPreferences.women = !newsletterPreferences.women : null">
          <span class="fs16 c-darkgray">Women</span>
        </div>
      </div>
      <div class="hidden-xs hidden-sm col-md-6"></div>
      <div class="col-xs-6 col-sm-6 col-md-3 preferences mb25">
        <div class="checkboxStyled">
          <input type="checkbox" v-model="newsletterPreferences.kids" id="kids" :disabled="!isActive">
          <label for="kids"></label>
        </div>
        <div class="checkboxText ml15 lh25" @click="isActive ? newsletterPreferences.kids = !newsletterPreferences.kids : null">
          <span class="fs16 c-darkgray">Kids</span>
        </div>
      </div>
      <div class="col-xs-6 col-sm-6 col-md-3 mb25">
        <div class="checkboxStyled">
          <input type="checkbox" v-model="newsletterPreferences.home" id="home" :disabled="!isActive">
          <label for="home"></label>
        </div>
        <div class="checkboxText ml15 lh25" @click="isActive ? newsletterPreferences.home = !newsletterPreferences.home : null">
          <span class="fs16 c-darkgray">Home</span>
        </div>
      </div>
      <div class="hidden-xs hidden-sm col-md-6"></div>
      <div class="col-xs-12 col-sm-6 mt10 bottom-button" v-show="isActive">
        <button-full text="Update my preferences" @click.native="updateNewsletter" />
      </div>
      <div class="col-xs-12 col-sm-6 mt25 bottom-button" v-show="isActive">
        <a href="#" @click="exitSection" class="link no-underline fs16 c-darkgray">Cancel</a>
      </div>
    </div>

  </div>
</template>

<script>
  import { coreComponent } from 'lib/themes'
  import ButtonFull from 'theme/components/theme/ButtonFull.vue'

  export default {
    props: ['isActive', 'editMode'],
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
            generalAgreement: this.stateNewsletter.generalAgreement,
            men: this.stateNewsletter.men,
            women: this.stateNewsletter.women,
            kids: this.stateNewsletter.kids,
            home: this.stateNewsletter.home
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
    },
    components: {
      ButtonFull
    },
    mixins: [coreComponent('core/blocks/MyAccount/MyNewsletter')]
  }
</script>

<style lang="scss" scoped>
  @media (max-width: 768px) {
    .preferences {
      padding-left: 15px;
    }
  }
</style>