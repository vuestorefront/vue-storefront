<template>
  <no-ssr>
    <div>
      <div class="bg-cl-secondary py35 pl20">
        <div class="container">
          <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" :active-route="$props.title" />
          <h2 class="fs-big">
            {{ $props.title }}
          </h2>
        </div>
      </div>
      <!-- TODO : we will use current location leter -->
      <!-- <CurrentLocation /> -->
        &nbsp;
      <div class="input-store-locator">
        <base-input
          class="col-xs-12 col-sm-4 mb10"
          type="text"
          name="zip"
          :placeholder="$t('Zip Code')"
          v-model.trim="zip"
          @keyup.enter="findStore"
        />
        <div class="text-center">
          <h4 class="m5">
            or
          </h4>
        </div>
        <base-input
          class="col-xs-12 col-sm-4 mb10"
          type="text"
          name="city"
          :placeholder="$t('City')"
          v-model.trim="city"
          @keyup.enter="findStore"
        />
          &nbsp; &nbsp;
        <base-input
          class="col-xs-12 col-sm-4 mb10"
          type="text"
          name="state"
          :placeholder="$t('State')"
          v-model.trim="state"
          @keyup.enter="findStore"
        />
      </div>
      <div class="flex store-locator-btn p10">
        <button-full @click.native="findStore()">
          {{ $t('Find Store') }}
        </button-full>
        <ButtonOutline @click.native="reset()" color="dark">
          {{ $t('Reset') }}
        </ButtonOutline>
      </div>
      <div class="product-listing row m0 center-xs start-md">
        <div v-for="(store,index) in storesLocation" :key="`store-${index}`" class="col-sm-6 col-md-6 col-lg-4 col-xs-12 flex">
          <NearBy :store="store" />
        </div>
      </div>
    </div>
  </no-ssr>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import CurrentLocation from '../components/CurrentLocation'
import NearBy from '../components/NearBy'
import StoreLocations from '../mixins/storeLocations'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import NoSSR from 'vue-no-ssr'
import config from 'config'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import ButtonOutline from 'theme/components/theme/ButtonOutline.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Breadcrumbs,
    CurrentLocation,
    NearBy,
    BaseSelect,
    BaseInput,
    ButtonFull,
    ButtonOutline,
    'no-ssr': NoSSR
  },
  data: function () {
    return {
      zip: '',
      city: '',
      state: '',
      storesLocation: []
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.$props.title,
      meta: this.$route.meta.description ? [{vmid: 'description', description: this.$route.meta.description}] : []
    }
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
  computed: {
    ...mapState({
      currentUser: state => state.user.current
    }),
    activeComponent () {
      const matchedNav = this.navigation.find(nav => nav.link === this.$route.path)
      return matchedNav ? matchedNav.component : null
    },
    stateOptions () {
      return this.tempstore.states.map((item) => {
        return {
          value: item.code,
          label: item.name
        }
      })
    }
  },
  methods: {
    async findStore () {
      this.$bus.$emit('notification-progress-start', i18n.t('Finding Stores Please Wait ...'))
      let accounts = []
      let locations = []
      let accessToken = await this.getAccessToken()
      if (accessToken) {
        if (config.google_my_business.accounts) {
          accounts = config.google_my_business.accounts
        } else {
          let res = await this.getAccounts(accessToken)
          if (res.error && res.error.code === 401) {
            this.refreshToken()
            this.$bus.$emit('notification-progress-stop')
          } else {
            accounts = res.accounts
          }
        }
        if (accounts.length > 0) {
          locations = accounts.map(account => {
            return this.getAllLocations(account, {'zip': this.zip, 'city': this.city, 'state': this.state}, accessToken)
          });
          Promise.all(locations).then((res) => {
            if (res[0].error && res[0].error.code === 401) {
              this.storesLocation = []
              this.refreshToken()
              this.$bus.$emit('notification-progress-stop')
            } else {
              this.storesLocation = []
              res.forEach(e => {
                if (Object.keys(e).length > 0) {
                  e.locations.forEach(el => {
                    this.storesLocation.push(el);
                  })
                }
              });
              this.$bus.$emit('notification-progress-stop')
              this.moveMyStoreToFirst()
            }
          })
        } else {
          this.$bus.$emit('notification-progress-stop')
        }
      } else {
        this.$bus.$emit('notification-progress-stop')
      }
    },
    reset () {
      this.city = ''
      this.zip = ''
      this.state = ''
    },
    moveMyStoreToFirst () {
      if (this.currentUser) {
        let myStoreIndex = this.storesLocation.findIndex(e => e.storeCode === this.currentUser.storeCode);
        let temp = this.storesLocation[0]
        this.storesLocation[0] = this.storesLocation[parseInt(myStoreIndex)];
        this.storesLocation[parseInt(myStoreIndex)] = temp;
      }
    }
  },
  mixins: [StoreLocations]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$border-primary: color(primary, $colors-border);

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
    background-color: $border-primary;
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
.text-center{
    text-align: center;
}
.input-store-locator {
  display:flex;
  justify-content: center;
  margin-left: 25%;
  margin-right: 25%;
  @media (max-width: 767px) {
   display:inline;
  }
}
.store-locator-btn {
  justify-content: center;
}
.button-full {
  width: auto;
  margin-right: 5px;
  min-width: 220px;
  @media (max-width: 767px) {
    min-width:160px !important;
  }
}
.button-outline {
  min-width: 220px;
  @media (max-width: 767px) {
    min-width:160px !important;
  }
}
</style>
