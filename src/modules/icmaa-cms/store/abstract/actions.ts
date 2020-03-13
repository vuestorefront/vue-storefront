import CmsService from 'icmaa-cms/data-resolver/CmsService'
import { MutationTypesInterface } from '../abstract/mutation-types'
import mutationTypes from '../generic/mutation-types'

export { MutationTypesInterface }

export interface OptionsInterface {
  context: any,
  options: string | ListOptionsInterface | SingleOptionsInterface,
  documentType: string,
  mutationTypes: MutationTypesInterface,
  storageKey: string,
  identifier?: string
}

export interface SingleOptionsInterface {
  key?: string|null,
  value: string
}

export interface ListOptionsInterface {
  [key: string]: any
}

export const list = async <T>(options: OptionsInterface): Promise<T[]> => {
  let filter = options.options as ListOptionsInterface | string
  let { context, documentType, mutationTypes } = options
  const { state } = context

  const identifier = options.identifier || 'identifier'

  if (typeof filter === 'string') {
    let valuesArray = filter.split(',')
    const existingStateItems = valuesArray.filter(i => (state.items.find(s => s[identifier] === i)))

    if (state.items.length > 0 && valuesArray.length === existingStateItems.length) {
      return state.items.filter(i => existingStateItems.includes(i[identifier]))
    }

    filter = valuesArray.filter(i => !existingStateItems.includes(i)).join(',')
  }

  if (filter.length === 0) {
    return
  }

  return CmsService.list<T>({ documentType, query: (filter as any) })
    .then(results => {
      results.forEach(data => context.commit(mutationTypes.add, data))
      return results
    })
}

export const single = async <T>(options: OptionsInterface): Promise<T> => {
  let { key, value } = options.options as SingleOptionsInterface
  let { context, documentType, mutationTypes } = options
  const { commit, state } = context

  if (!key || key === null) {
    key = 'identifier'
  }

  if (state.items && state.items.length > 0) {
    const existing = state.items.find(v => v[key] === value)
    if (existing) {
      return existing
    }
  }

  const promise = CmsService.single({ documentType, uid: value })
  return promise.then<T>((data: any): T => {
    commit(mutationTypes.add, data)
    return data
  })
}
