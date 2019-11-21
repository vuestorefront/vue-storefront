import i18n from '@vue-storefront/i18n'
import { mapGetters } from 'vuex'
import { htmlDecode } from '@vue-storefront/core/lib/store/filters'

export default {
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      getChildProductIdByCurrentProductOption: 'icmaaProductAlert/getChildProductIdByCurrentProductOption'
    })
  },
  methods: {
    async addProductStockAlert (option): Promise<boolean> {
      if (!this.isLoggedIn) {
        this.$bus.$emit('modal-toggle', 'modal-signup')
        return
      }

      const configurableChildId = this.getChildProductIdByCurrentProductOption(option)
      if (configurableChildId) {
        this.loading = true
        return this.$store.dispatch('icmaaProductAlert/addProductStockAlert', configurableChildId)
          .then(status => {
            this.loading = false
            if (status) {
              this.$store.dispatch('ui/closeAll')
              this.$store.dispatch('notification/spawnNotification', {
                type: 'success',
                message: i18n.t(
                  'You successfully subscribed yourself to this products stock notifications. You will receive updates about this product in future.'
                ),
                action1: { label: i18n.t('OK') }
              }, { root: true })
            }

            return status
          })
      }

      return false
    }
  }
}
