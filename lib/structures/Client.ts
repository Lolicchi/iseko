import { ClientWebSocket } from '../client/ws.client.ts'
import { ApiRequest } from './ApiRequest.ts'
import { ClientEvents } from './ClientEvents.ts'
import { Guilds } from '../client/guilds.client.ts'
import { Channels } from '../client/channels.client.ts'
import { Voice } from '../client/voice.client.ts'

interface LoggedOutClient {
  events?:
    | ({
        [Key in keyof ClientEvents]?: (
          args: { client: Client<1> } & ClientEvents[Key]
        ) => void
      } & { dir?: string })
    | boolean
  api: ApiRequest
  prefix?: string | string[] | undefined
  plugins?: (
    | { init(client: Client<1>): void }
    | Promise<{ init(client: Client<1>): void }>
  )[]
  connect(): Promise<Client<2>>
}

interface LoggedInClient extends Omit<LoggedOutClient, 'connect'> {
  ws: ClientWebSocket
  disconnect(): void
}

interface ReadyClient extends LoggedInClient {
  guilds: Guilds
  channels: Channels
  voice: Voice
}

export type Client<Level extends 0 | 1 | 2 | 3 = 0> = Level extends 0
  ? LoggedOutClient | LoggedInClient | ReadyClient
  : Level extends 1
  ? LoggedOutClient
  : Level extends 2
  ? LoggedInClient
  : Level extends 3
  ? ReadyClient
  : never
