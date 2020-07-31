import hierarchyActions from '../../store/hierarchy/actions'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'

jest.mock('@vue-storefront/core/lib/search')

jest.mock('@vue-storefront/core/app', () => jest.fn())
jest.mock('@vue-storefront/core/store', () => ({ Module: jest.fn() }))
jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));

describe('Hierarchy actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should list hierarchy', async () => {
    const contextMock = {};
    const filter = { id: 1, entityType: 'cms_hierarchy', excludeFields: null, includeFields: null }

    const wrapper = (actions: any) => actions.list(contextMock, filter);
    const listAction = await wrapper(hierarchyActions)

    expect(quickSearchByQuery).toHaveBeenCalled()
  })
})
