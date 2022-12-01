import { GLOBAL } from '../const'
import { BrowserStorage } from '../type'

class MemoryCache implements BrowserStorage {
  private cache: Record<string, string> = {}

  get length(): number {
    return Object.keys(this.cache).length
  }

  clear(): void {
    this.cache = {}
  }

  getItem(key: string): string | null {
    return this.cache[key] || null
  }

  key(index: number): string | null {
    const keys = Object.keys(this.cache)
    return keys[index] || null
  }

  removeItem(key: string): void {
    delete this.cache[key]
  }

  setItem(key: string, value: string): void {
    this.cache[key] = value
  }
}

export class GlobalMemoryCache {
  static #database: Record<string | symbol, BrowserStorage> = {}

  static create(id: string | symbol = GLOBAL) {
    if (this.#database[id]) {
      return this.#database[id]
    }

    const cache = (this.#database[id] = new MemoryCache())

    return cache
  }
}
