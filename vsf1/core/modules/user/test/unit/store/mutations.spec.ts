import * as types from '../../../store/mutation-types'
import userMutations from '../../../store/mutations'
import * as data from './data'

jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    log: jest.fn(() => () => {
    })
  }
}));

describe('User mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('USER_TOKEN_CHANGED', () => {
    it('should assign new user token', () => {
      const stateMock = {
        token: ''
      }
      const expectedState = {
        token: data.lastUserToken
      }
      const wrapper = (mutations: any) => mutations[types.USER_TOKEN_CHANGED](stateMock, { newToken: data.lastUserToken })

      wrapper(userMutations)

      expect(stateMock).toEqual(expectedState)
    })
    it('should assign new token and new refreshToken', () => {
      const stateMock = {
        token: '',
        refreshToken: ''
      }
      const expectedState = {
        token: data.lastUserToken,
        refreshToken: 'refresh-token'
      }
      const wrapper = (mutations: any) => mutations[types.USER_TOKEN_CHANGED](stateMock, {
        newToken: data.lastUserToken,
        meta: { refreshToken: 'refresh-token' }
      })

      wrapper(userMutations)

      expect(stateMock).toEqual(expectedState)
    })
  })

  describe('USER_START_SESSION', () => {
    it('should assign session_started', () => {
      jest.isolateModules(() => {
        let dateTest = new Date(Date.now());
        jest
          .spyOn(global, 'Date')
          .mockImplementationOnce(() => dateTest.toDateString());

        const stateMock = {
          session_started: new Date()
        }
        const expectedState = {
          session_started: new Date()
        }
        const wrapper = (mutations: any) => mutations[types.USER_START_SESSION](stateMock)

        wrapper(userMutations)

        expect(stateMock).toEqual(expectedState)
      })
    })
  })

  describe('USER_GROUP_TOKEN_CHANGED', () => {
    it('should assign token to groupToken', () => {
      const stateMock = {
        groupToken: ''
      }
      const expectedState = {
        groupToken: data.user.groupToken
      }
      const wrapper = (mutations: any) => mutations[types.USER_GROUP_TOKEN_CHANGED](stateMock, data.user.groupToken)

      wrapper(userMutations)

      expect(stateMock).toEqual(expectedState)
    })
  })

  describe('USER_GROUP_CHANGED', () => {
    it('should assign groupid', () => {
      const stateMock = {
        groupId: null
      }
      const expectedState = {
        groupId: data.user.group_id
      }
      const wrapper = (mutations: any) => mutations[types.USER_GROUP_CHANGED](stateMock, data.user.group_id)

      wrapper(userMutations)

      expect(stateMock).toEqual(expectedState)
    })
  })

  describe('USER_INFO_LOADED', () => {
    it('should assign current user', () => {
      const stateMock = {
        current: null
      }
      const expectedState = {
        current: data.user
      }
      const wrapper = (mutations: any) => mutations[types.USER_INFO_LOADED](stateMock, data.user)

      wrapper(userMutations)

      expect(stateMock).toEqual(expectedState)
    })
  })

  describe('USER_ORDERS_HISTORY_LOADED', () => {
    it('should assign orders history', () => {
      const stateMock = {
        orders_history: null
      }
      const expectedState = {
        orders_history: data.ordersHistory
      }
      const wrapper = (mutations: any) => mutations[types.USER_ORDERS_HISTORY_LOADED](stateMock, data.ordersHistory)

      wrapper(userMutations)

      expect(stateMock).toEqual(expectedState)
    })
  })

  describe('USER_END_SESSION', () => {
    it('should clear current user token, current user info and session_started', () => {
      const stateMock = {
        token: data.lastUserToken,
        current: data.user,
        session_started: new Date()
      }
      const expectedState = {
        token: '',
        current: null,
        session_started: null
      }
      const wrapper = (mutations: any) => mutations[types.USER_END_SESSION](stateMock)

      wrapper(userMutations)

      expect(stateMock).toEqual(expectedState)
    })
  })

  describe('USER_LOCAL_DATA_LOADED', () => {
    it('should assign readed boolean value to local_data_loaded', () => {
      const stateMock = {
        local_data_loaded: false
      }
      const expectedState = {
        local_data_loaded: true
      }
      const wrapper = (mutations: any) => mutations[types.USER_LOCAL_DATA_LOADED](stateMock, true)

      wrapper(userMutations)

      expect(stateMock).toEqual(expectedState)
    })
  })
})
