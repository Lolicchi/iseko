import { fetchRes } from '../utils/fetchRes.ts'

export class Cacher<K, V> extends Map<K, V> {
  constructor(endpoint: (id: string) => string, token: string) {
    super()
    this.get = async (id: K) => {
      if (super.has(id)) return super.get(id)
      const item = await fetchRes<V>(endpoint(id), token)
      if (!item) return undefined
      return item
    }
  }
}
