import { TinyStore } from './store'
import { DeserializeFn, SerializeFn, StorageType } from './type'

export type CreateStoreOption = {
  serialize?: SerializeFn
  deserialize?: DeserializeFn
}

export function createStore(
  type: StorageType,
  namespace?: string,
  options?: CreateStoreOption
) {
  return new TinyStore({
    namespace,
    type,
    serialize: options?.serialize,
    deserialize: options?.deserialize,
  })
}

export function createSessionStore(
  namespace?: string,
  options?: CreateStoreOption
) {
  return createStore('session', namespace, options)
}

export function createMemoryStore(
  namespace?: string,
  options?: CreateStoreOption
) {
  return createStore('memory', namespace, options)
}
