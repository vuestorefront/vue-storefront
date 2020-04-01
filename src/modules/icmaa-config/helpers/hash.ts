import { sha3_224 } from 'js-sha3'

export const getHash: Function = (s: string): string => sha3_224(s)

export const getObjectHash = (o: object): string => getHash(JSON.stringify(o))
