import { Events } from '../interfaces/Events.ts'
import { ApiRequest } from '../structures/ApiRequest.ts'
import { Iseko } from './Iseko.ts'

export interface IsekoOptions {
  token: string
  intents?: string[] | number
  prefix?: string | string[]
  api?: ApiRequest
  plugins?: (PromiseLike<{
    init(client: Iseko.Ready | Iseko.LoggedIn | Iseko.Ready): void
  }>)[]
  events?: (Events & { dir?: string }) | boolean
  debug?: boolean
}
