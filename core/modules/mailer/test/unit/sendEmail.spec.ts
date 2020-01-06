import { mailerStore } from '../../store/index'
import config from 'config'

jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('@vue-storefront/core/lib/storage-manager', () => jest.fn())
jest.mock('@vue-storefront/core/app', () => jest.fn())
jest.mock('@vue-storefront/core/lib/multistore', () => jest.fn())
jest.mock('@vue-storefront/core/store', () => ({ Module: jest.fn() }))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    error: jest.fn(() => jest.fn())
  }
}))

describe('Mailer store module', () => {
  const letterMock = {}
  const contextMock = {};
  const wrapper = (actions: any) => actions.sendEmail(contextMock, letterMock)

  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.resetMocks()
  })

  it('should send email succesfully', async () => {
    fetchMock.mockResponses(
      [ JSON.stringify({ code: 200 }), { status: 200 } ],
      [ JSON.stringify({ send: true }), { status: 200 } ]
    )

    const res = await wrapper(mailerStore.actions);
    const resData = await res.json()

    expect(resData.send).toBe(true)
  })

  it('should thrown error when response code is wrong', async () => {
    const wrongResponseCode = 201;
    fetchMock.mockResponseOnce(JSON.stringify({ code: wrongResponseCode }))

    try {
      const res = await wrapper(mailerStore.actions)
    } catch (e) {
      expect(e.message).toBe(`Error: ${wrongResponseCode}`)
    }
  })
})
