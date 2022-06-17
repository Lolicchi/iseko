import { ApiRequest } from '../../lib/structures/ApiRequest.ts'
import { Constants } from '../../lib/utils/Constants.ts'

export class ApiProxy {
  constructor(public url: string) {}

  init() {}

  apiRouter(token: string) {
    return new ApiRequest(
      token,
      async <T>(
        endpoint: string,
        options?: {
          headers?: HeadersInit
          method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
          body?: Record<string, unknown> | null
        }
      ): Promise<T> => {
        console.log(`using proxy ${this.url} `)
        if (!options) options = { method: 'GET' }
        if (!options.method) options.method = 'GET'

        const res = await fetch(this.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([
            `${Constants.API}/${endpoint}`,
            {
              method: options.method,
              headers: {
                ...options.headers,
                'Content-Type': 'application/json',
                Authorization: token
              },
              body: JSON.stringify(options.body)
            }
          ])
        })
        console.log('res ::', res)
        if (!res.ok) throw res
        return await res.json()
      }
    )
  }
}
