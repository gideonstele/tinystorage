import { GLOBAL } from './const'
import { BrowserStorage, StoreOption, DeserializeFn, SerializeFn } from './type'
import { getWithExpire, setWithExpire } from './utils/expire'
import { spellKey } from './utils/keys'
import { GlobalMemoryCache } from './utils/memory'
import { defaultSerialize, defaultDeserialize } from './utils/serialize'
import { isBrowser } from './utils/check'
import { warn } from './utils/console'

export class TinyStore {
  namespace: string | symbol

  #storage: BrowserStorage

  private serialize: SerializeFn

  private deserialize: DeserializeFn

  constructor(option: StoreOption) {
    this.namespace = option.namespace || GLOBAL
    this.serialize = option.serialize || defaultSerialize
    this.deserialize = option.deserialize || defaultDeserialize

    if (typeof option.type === 'string') {
      if (isBrowser()) {
        switch (option.type) {
          case undefined:
          case 'local':
            this.#storage = window.localStorage
            break
          case 'session':
            this.#storage = window.sessionStorage
            break
          case 'memory':
            this.#storage = GlobalMemoryCache.create(this.namespace)
            break
        }
      } else {
        this.#storage = GlobalMemoryCache.create(this.namespace)

        if (option.type === 'local' || option.type === 'session') {
          warn(
            `You are using ${option.type}Storage in a non-browser environment.`
          )
        }
      }
    } else {
      if (!option.type) {
        throw new Error('Storage is required.')
      }
      this.#storage = option.type
    }
  }

  getItem<Value>(key: string, defaultValue?: Value) {
    const realKey = spellKey(this.namespace, key)
    const primitiveValue = this.#storage.getItem(realKey)

    if (primitiveValue === null) {
      return defaultValue as Value | undefined
    }

    const { hasExpired, data } = getWithExpire(primitiveValue)

    if (hasExpired) {
      this.#storage.removeItem(realKey)
      return undefined
    }

    return this.deserialize(data) as Value
  }

  setItem<Value = any>(key: string, value: Value, expireAfter?: number) {
    const realKey = spellKey(this.namespace, key)
    const primitiveValue = this.serialize(value)

    if (expireAfter === undefined) {
      this.#storage.setItem(realKey, primitiveValue)
    } else {
      this.#storage.setItem(realKey, setWithExpire(primitiveValue, expireAfter))
    }
  }

  removeItem(key: string) {
    const realKey = spellKey(this.namespace, key)
    this.#storage.removeItem(realKey)
  }

  on(key: string, callback: (value: any) => void) {
    if (isBrowser() && this.#storage instanceof window.Storage) {
      const realKey = spellKey(this.namespace, key)
      const handler = (event: StorageEvent) => {
        if (event.key === realKey && event.storageArea === this.#storage) {
          callback(event.newValue ? this.deserialize(event.newValue) : null)
        }
      }
      window.addEventListener('storage', handler)
      return () => window.removeEventListener('storage', handler)
    } else if (this.#storage.subscribe) {
      return this.#storage.subscribe(key, callback)
    }
  }
}
