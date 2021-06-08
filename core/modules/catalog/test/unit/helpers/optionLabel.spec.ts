import { optionLabel } from '@vue-storefront/core/modules/catalog/helpers/optionLabel';

describe('optionLabel', () => {
  it('returns proper opt.label and sets it in state', () => {
    const mockedData = {
      state: {
        attribute: {
          labels: {
            color: {}
          },
          list_by_code: {
            color: {
              options: [
                {
                  label: 'Orange',
                  sort_order: 7,
                  swatch: {
                    type: 1,
                    value: '#eb6703'
                  },
                  value: '5483'
                }
              ]
            }
          }
        }
      }
    }
    const label = optionLabel(mockedData.state.attribute, { attributeKey: 'color', optionId: 5483 })
    const result = mockedData.state.attribute.labels;
    const expectedLabels = {
      color: {
        5483: 'Orange'
      }
    }
    expect(label).toBe('Orange');
    expect(result).toMatchObject(expectedLabels)
  })

  it('returns cached label', () => {
    const mockedData = {
      state: {
        attribute: {
          labels: {
            color: {
              5483: 'Orange'
            }
          }
        }
      }
    }

    const result = optionLabel(mockedData.state.attribute, { attributeKey: 'color', optionId: 5483 })
    const expectedResult = 'Orange'

    expect(result).toBe(expectedResult)
  })

  it('returns optionId if opt.label doesn\'t exist', () => {
    const mockedData = {
      state: {
        attribute: {
          list_by_code: {
            color: {
              options: [
                {
                  sort_order: 7,
                  swatch: {
                    type: 1,
                    value: '#eb6703'
                  },
                  value: '5483'
                }
              ]
            }
          }
        }
      }
    }
    const label = optionLabel(mockedData.state.attribute, { attributeKey: 'color', optionId: 5483 })

    expect(label).toBe(5483);
  })

  it('returns optionId if attribute doesn\'t exist', () => {
    const mockedData = {
      state: {
        attribute: {
          list_by_code: {}
        }
      }
    }
    const label = optionLabel(mockedData.state.attribute, { attributeKey: 'color', optionId: 5483 })

    expect(label).toBe(5483);
  })

  it('searchBy works properly', () => {
    const mockedData = {
      state: {
        attribute: {
          list_by_id: {
            152: {
              options: [
                {
                  label: '55 cm',
                  sort_order: 0,
                  value: '5518'
                }
              ]
            }
          }
        }
      }
    }
    const label = optionLabel(mockedData.state.attribute, { attributeKey: '152', searchBy: 'id', optionId: 5518 })

    expect(label).toBe('55 cm')
  })
})
