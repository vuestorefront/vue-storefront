import * as types from '../../../store/mutation-types'
import { mutations as urlMutations } from '../../../store/mutations'

describe('url mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('REGISTER_MAPPING', () => {
    it('should register mapping', () => {
      const stateMock = {
        dispatcherMap: {}
      }
      const payloadData = {
        url: 'https://www.example.com',
        routeData: { name: 'example' }
      }
      const expectedState = {
        dispatcherMap: {
          'https://www.example.com': { name: 'example' }
        }
      }
      const wrapper = (mutations: any) => mutations[types.REGISTER_MAPPING](stateMock, payloadData)

      wrapper(urlMutations)

      expect(stateMock).toEqual(expectedState)
    })
  })
})
