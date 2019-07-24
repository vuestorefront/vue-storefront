import { Payload } from '../types/Payload'

export const tap = async ({}, payload: Payload) => {
  console.log('mappingFallback payload:', payload)
  return undefined
}
