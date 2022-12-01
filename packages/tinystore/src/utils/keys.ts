import { GLOBAL } from '../const'

const SPLIT = '|'

export const spellKey = (namespace: string | symbol, key: string) => {
  if (typeof namespace === 'symbol') {
    return encodeURIComponent(key)
  }

  return encodeURIComponent(`${namespace}${SPLIT}${key}`)
}

export const parseKey = (key: string) => {
  const [prefix, main] = key.split(SPLIT)

  let namespace: symbol | string = GLOBAL,
    realKey = decodeURIComponent(key)

  if (main) {
    namespace = decodeURIComponent(prefix)
    realKey = decodeURIComponent(main)
  } else {
    realKey = prefix
  }

  return {
    namespace,
    key: realKey,
  }
}
