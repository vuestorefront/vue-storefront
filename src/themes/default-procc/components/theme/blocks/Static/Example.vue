<template>
  <div>
    <div v-for="(policy, policy_key) in getPolicyData($route.meta.page)" :key="policy.type" v-if="policy.warranty_title">
      <div class="col-1 pr-0" style="max-width: 32px">
        <i class="fa fa-asterisk" />
      </div>
      <div class="col-11" v-if="Object.keys(policy.conditions).length > 0">
        <h3 v-text="policy.warranty_title" />
      </div>
      <ul class="col-11 pl-1">
        <li class="col-11" v-for="(opt_condition, opt_in_name) in policy.conditions" :key="opt_in_name" v-if="opt_in_name.indexOf('_array') === -1">
          <div class="row col-12" v-if="policy.conditions[opt_in_name] && !policy.conditions[opt_in_name + '_array']">
            <div>
              <p class="col-11 align-left">
                <span>{{ policy.conditions[opt_in_name] }}</span>
              </p>
            </div>
          </div>
          <div class="row col-12" v-else-if="policy.conditions[opt_in_name+'_array'] && policy.conditions[opt_in_name+'_array'].length > 0">
            <div>
              <div class="col-11 pl-1">
                <span class="display-inline" v-for="(condition_part, str_array_key) in policy.conditions[opt_in_name+'_array']" :key="str_array_key">
                  <span v-if="condition_part.indexOf('{') === -1 && condition_part.indexOf('}') === -1"
                        v-text="pagePolicy[policy_key].conditions[opt_in_name+'_array'][str_array_key]"
                  />
                  <span v-else-if="pagePolicy[policy_key][getKey(condition_part)+'_select']"
                        v-text="pagePolicy[policy_key][getKey(condition_part)]"
                  />
                  <span v-else
                        v-text="pagePolicy[policy_key][getKey(condition_part)]"
                  />
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="$route.meta.page === 'contact'">
      <div v-if="contact.contact_information">
        <h3>Contact Information</h3>
        <p>{{ $t(contact.contact_information) }}</p>
      </div>
      <div v-if="contact.about_text && contact.about_text !== '' && contact.about_text !== undefined">
        <h3>About Text</h3>
        <p>{{ $t(contact.about_text) }}</p>
      </div>
      <div v-if="contact.working_hours">
        <h3>Working Hours</h3>
        <p>{{ $t(contact.working_hours) }}</p>
      </div>
      <div v-if="((contact.contact_information === '' || contact.contact_information === undefined) && (contact.about_text === '' || contact.about_text === undefined) && (contact.working_hours === '' || contact.working_hours === undefined))">
        <h3 class="cl-accent">
          Unavailable Contact Information
        </h3>
      </div>
      <!--<div v-if="((contact.contact_information === '' || contact.contact_information === undefined) || (contact.about_text === '' || contact.about_text === undefined) || (contact.working_hours === '' || contact.working_hours === undefined))">-->
      <!--<small class="cl-warning"><sup class="cl-error">* </sup>Something Missing in Contact Information and it will be updated Soon...</small>-->
      <!--</div>-->
    </div>
    <!--<div v-else-if="!pagePolicy">-->
    <!--<h3 class="text-muted">There Is No Policy Yet :)</h3>-->
    <!--</div>-->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  methods: {
    getKey (conditionPart) {
      return Object.keys(JSON.parse(conditionPart))[0]
    },
    getWordCap (str) {
      return _.startCase(str)
    },
    getPolicyData (policyType) {
      this.pagePolicy = _.find(this.policyData, { 'type': policyType })
      return _.find(this.policyData, { 'type': policyType })
    }
  },
  data () {
    return {
      policyData: '',
      pagePolicy: '',
      contact: ''
    }
  },
  updated () {
    if (this.$route.meta.page === 'contact') this.contact = this.currentImage
    console.log('Contact', this.contact)
  },
  mounted () {
    this.policyData = _.get(this.currentStorePolicies.default, 'policy')
    this.pagePolicy = this.getPolicyData(this.$route.meta.page)
  },
  computed: {
    ...mapGetters({
      currentStorePolicies: 'policies/getStorePolicies',
      currentImage: 'procc/getHeadImage'
    })
  }
}
</script>
