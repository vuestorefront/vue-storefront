import cloneDeep from 'lodash-es/cloneDeep'
import pick from 'lodash-es/pick'

const initialStateFactory = (defaultState) => {
  const defaultFields = pick(defaultState, ['version', 'config', '__DEMO_MODE__', 'storeView'])

  const createInitialState = (currentState) => ({ ...cloneDeep(currentState), ...defaultFields })

  return { createInitialState }
}

export default initialStateFactory
