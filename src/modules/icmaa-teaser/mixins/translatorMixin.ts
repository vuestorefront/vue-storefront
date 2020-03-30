import Translation from '../helpers/defaultTranslator'

export default {
  filters: {
    translate (text) {
      const t = new Translation({ text })
      return t.translate()
    }
  }
}
