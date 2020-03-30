export const getHash: Function = (s: string): number => Math.abs(s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0))

export const getObjectHash = (o: object): string => getHash(JSON.stringify(o))
