import { TinyStore } from './store'
import { DeserializeFn, SerializeFn, StorageType } from './type'

export type CreateStorageOption = {
  serialize?: SerializeFn
  deserialize?: DeserializeFn
}

export function createStorage(
  type: StorageType,
  namespace?: string,
  options?: CreateStorageOption
) {
  return new TinyStore({
    namespace,
    type,
    serialize: options?.serialize,
    deserialize: options?.deserialize,
  })
}

export function createLocalStorage(
  namespace?: string,
  options?: CreateStorageOption
) {
  return createStorage('local', namespace, options)
}

export function createSessionStorage(
  namespace?: string,
  options?: CreateStorageOption
) {
  return createStorage('session', namespace, options)
}

export function createMemoryStorage(
  namespace?: string,
  options?: CreateStorageOption
) {
  return createStorage('memory', namespace, options)
}
