import cloneDeep from 'lodash-es/cloneDeep'
import pick from 'lodash-es/pick'

const initialStateFactory = (defaultState) => {
  // storing default values for the fields that will be set in createApp
  const defaultFields = pick(defaultState, ['version', 'config', '__DEMO_MODE__', 'storeView'])

  const createInitialState = (currentState) => ({
    ...cloneDeep(currentState),
    ...defaultFields,
    storeView: { storeCode: currentState.storeView.storeCode }
  })

  return { createInitialState }
}

export default initialStateFactory
