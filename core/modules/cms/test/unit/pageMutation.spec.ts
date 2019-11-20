import * as types from '../../store/page/mutation-types'
import pageMutations from '../../store/page/mutations'

jest.mock('@vue-storefront/core/app', () => jest.fn())

describe('Page mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should update cms pages', () => {
    const cmsPage = ['new-page1', 'new-page2']
    const stateMock = { items: [] }
    const expectedState = {
      items: ['new-page1', 'new-page2']
    }

    const wrapper = (mutations: any) => mutations[types.CMS_PAGE_UPDATE_CMS_PAGES](stateMock, cmsPage)
    wrapper(pageMutations)

    expect(stateMock).toEqual(expectedState)
  })

  it('should clear cms pages after update without args', () => {
    const stateMock = { items: ['new-page1', 'new-page2'] }
    const expectedState = { items: [] }

    const wrapper = (mutations: any) => mutations[types.CMS_PAGE_UPDATE_CMS_PAGES](stateMock, false)
    wrapper(pageMutations)

    expect(stateMock).toEqual(expectedState)
  })

  it('should set page to current', () => {
    const current = { id: 2, url: 'new-page' }
    const stateMock = { current: { id: 1, url: 'old-page' } }
    const expectedState = { current: { id: 2, url: 'new-page' } }

    const wrapper = (mutations: any) => mutations[types.CMS_PAGE_SET_CURRENT](stateMock, current)
    wrapper(pageMutations)

    expect(stateMock).toEqual(expectedState)
  })

  it('should add new page if page with the same id does NOT exist', () => {
    const cmsPage = { id: 2, url: 'new-page' }
    const stateMock = { items: [{ id: 1, url: 'old-page' }] }
    const expectedState = {
      items: [ { id: 1, url: 'old-page' }, { id: 2, url: 'new-page' } ]
    }

    const wrapper = (mutations: any) => mutations[types.CMS_PAGE_ADD_CMS_PAGE](stateMock, cmsPage)
    wrapper(pageMutations)

    expect(stateMock).toEqual(expectedState)
  })

  it('should NOT add new page if page with the same id exists', () => {
    const cmsPage = { id: 1, url: 'new-page' }
    const stateMock = { items: [{ id: 1, url: 'old-page' }] }
    const expectedState = {
      items: [ { id: 1, url: 'old-page' } ]
    }

    const wrapper = (mutations: any) => mutations[types.CMS_PAGE_ADD_CMS_PAGE](stateMock, cmsPage)
    wrapper(pageMutations)

    expect(stateMock).toEqual(expectedState)
  })
})
