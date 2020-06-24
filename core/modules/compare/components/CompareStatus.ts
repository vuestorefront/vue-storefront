import config from 'config'

export const CompareStatus = {
  name: 'CompareStatus',
  computed: {
    isCompareEnabled(): boolean {
      return config.compare.enabled
    }
  }
}
