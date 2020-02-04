<template>
  <div class="t-mb-4">
    <div class="t-font-bold t-mb-4" v-if="headline">
      {{ table.headline }}
    </div>
    <table class="t-w-full t-text-xs t-table-auto">
      <thead />
      <tbody>
        <tr v-for="rowKey in tableRowKeys" :key="rowKey" class="t-border-b t-border-base-lighter">
          <td class="t-border t-border-base-lighter t-p-1" v-for="(value, key) in table[rowKey]" :key="key">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'ServiceSizeTable',
  props: {
    table: {
      required: true,
      type: Object
    },
    headline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tableRowKeys () {
      return Object.keys(this.table).filter(el => el.includes('row'))
    }
  }
}
</script>
