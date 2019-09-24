export default {
  computed: {
    featureAttributes () {
      return [
        'features_backpacks',
        'features_headphones',
        'features_headwear',
        'features_pants',
        'features_shoes',
        'features_tops',
        'features_watches',
        'features_label',
        'features_merchandise',
        'commonphrases'
      ]
    },
    contentAttributes () {
      return [
        'features_media',
        'features_specialpack'
      ]
    },
    conversionAttributes () {
      return [
        'features_bp_measures',
        'features_bp_volume',
        'features_bp_weight'
      ]
    },
    conversionRates () {
      return {
        'metric': {
          'features_bp_measures': 1, // cm
          'features_bp_volume': 1, // liter
          'features_bp_weight': 1 // gramm
        },
        'imperial': {
          'features_bp_measures': 0.3937, // Zentimeter -> "
          'features_bp_volume': 61.0237, // Liter -> Kubikinch, in^3
          'features_bp_weight': 0.00220462262 // Gramm -> Pound, lb
        }
      }
    },
    conversionUnits () {
      return {
        'metric': {
          'features_bp_measures': 'cm',
          'features_bp_volume': ' l',
          'features_bp_weight': ' g'
        },
        'imperial': {
          'features_bp_measures': '"',
          'features_bp_volume': ' in&sup3;',
          'features_bp_weight': ' lb'
        }
      }
    },
    hasFeatures () {
      let values = 0
      const features = [
        ...this.featureAttributes,
        ...this.contentAttributes,
        ...this.conversionAttributes
      ]

      features.forEach(f => {
        const value = this.product[f]
        if (value && typeof value === 'object' && value.join('') !== '') {
          values += 1
        }
      })

      return values > 0
    }
  }
}
