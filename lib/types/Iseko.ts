import { Channels } from '../client/channels.client.ts'
import { Guilds } from '../client/guilds.client.ts'
import { ClientUser } from '../client/user.client.ts'
import { Voice } from '../client/voice.client.ts'
import { ClientWebSocket } from '../client/ws.client.ts'
import { Events } from '../interfaces/Events.ts'
import { ApiRequest } from '../structures/ApiRequest.ts'
import { ClientPresence } from '../structures/ClientPresence.ts'

export declare namespace Iseko {
  export interface LoggedOut {
    api: ApiRequest
    events?: true | (Events & { dir?: string }) | undefined
    plugins?:
      | PromiseLike<{
          init(client: Iseko.LoggedOut | Iseko.LoggedIn | Iseko.Ready): void
        }>[]
      | undefined
    prefix?: string | string[] | undefined
    connect(): Promise<LoggedIn>
  }

  export interface LoggedIn extends LoggedOut {
    channels: Channels
    guilds: Guilds
    presence: ClientPresence
    user: ClientUser | null
    voice: Voice
    ws: ClientWebSocket
    disconnect(): void
  }

  export interface Ready extends LoggedIn {
    user: ClientUser
  }

  export interface inVC {
    vc: Voice
  }
}
