import { Iseko } from '../../lib/client/client.ts'
import { ApiRequest } from '../../lib/structures/ApiRequest.ts'
import { Constants } from '../../lib/utils/Constants.ts'

// export const ApiRequestServe: NonNullable<
//   ConstructorParameters<typeof ApiRequest>[1]
// > = async <T>(
//   // token: string, //make this a class and make setToken method
//   endpoint: string,
//   options?: {
//     //make options destructured too by defaulting it to = {} or { method: 'GET', body: null }
//     headers?: HeadersInit
//     method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
//     body?: Record<string, unknown> | null
//   }
// ): Promise<T> => {
//   if (!options) options = { method: 'GET', body: null }
//   if (!options.method) options.method = 'GET'
//   if (!options.body) options.body = null

//   const res = await (
//     await fetch(`${Constants.API}/${endpoint}`, {
//       method: options.method,
//       headers: {
//         ...options.headers,
//         'Content-Type': 'application/json',
//         Authorization: token
//       },
//       body: JSON.stringify(options.body)
//     })
//   ).json()
//   console.log(res)
//   if (res.code) throw res
//   return res
// }

export class ApiRequestServer {
  // private request = (args) => new ApiRequest(args)

  init(client: Iseko) {
    client.api = new ApiRequest(
      client.token,
      async <T>(
        endpoint: string,
        options?: {
          headers?: HeadersInit
          method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
          body?: Record<string, unknown> | null
        }
      ): Promise<T> => {
        console.log('poop')
        if (!options) options = { method: 'GET', body: null }
        if (!options.method) options.method = 'GET'
        if (!options.body) options.body = null

        const res = await (
          await fetch(`${Constants.API}/${endpoint}`, {
            method: options.method,
            headers: {
              ...options.headers,
              'Content-Type': 'application/json',
              Authorization: client.token
            },
            body: JSON.stringify(options.body)
          })
        ).json()
        console.log(res)
        if (res.code && (res.code !== 200 || res.code !== 204)) throw res
        return res
      }
    )
  }

  connect(token: string) {
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
        console.log('poop')
        if (!options) options = { method: 'GET', body: null }
        if (!options.method) options.method = 'GET'
        if (!options.body) options.body = null

        const res = await (
          await fetch(`${Constants.API}/${endpoint}`, {
            method: options.method,
            headers: {
              ...options.headers,
              'Content-Type': 'application/json',
              Authorization: token
            },
            body: JSON.stringify(options.body)
          })
        ).json()
        console.log(res)
        if (res.code && (res.code !== 200 || res.code !== 204)) throw res
        return res
      }
    )
  }
}
