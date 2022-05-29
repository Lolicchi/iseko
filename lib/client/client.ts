import { ClientWebSocket } from './ws.client.ts'
import { type ClientUser } from './user.client.ts'
import { Guilds } from './guilds.client.ts'
import { Channels } from './channels.client.ts'
import { type ClientEvents } from '../structures/ClientEvents.ts'
import { Voice } from './voice.client.ts'
import { handler } from '../Handler.ts' // casing error
import { Constants } from '../utils/Constants.ts'
import { IPresence } from '../interfaces/IPresence.ts'
import { RawPresence } from '../structures/RawPresence.ts'
import { ApiRequest } from '../structures/ApiRequest.ts' //change to http url

export class Iseko<isReady extends boolean = boolean> {
  user!: isReady extends true
    ? ClientUser
    : isReady extends false
    ? undefined
    : ClientUser | undefined
  guilds: Guilds
  channels: Channels
  ws: ClientWebSocket
  connect: (token?: string) => void
  token: string
  voice: Voice = new Voice(this)
  debug = false
  events?:
    | ({
        [Key in keyof ClientEvents]?: (
          args: { client: Iseko } & ClientEvents[Key]
        ) => void
      } & { dir?: string })
    | boolean
  api: ApiRequest
  prefix: string | string[] | undefined

  constructor({
    api,
    token,
    intents,
    prefix,
    plugins,
    events,
    debug
  }: {
    token: string
    intents?: string[] | number
    prefix?: string | string[]
    api?: ApiRequest
    plugins?: (
      | { init(client: Iseko): void }
      | Promise<{ init(client: Iseko): void }>
    )[]
    events?:
      | ({
          [Key in keyof ClientEvents]?: ({
            client,
            ...args
          }: { client: Iseko } & ClientEvents[Key]) => void
        } & { dir?: string })
      | boolean
      | undefined
    debug?: boolean
  }) {
    if (debug || Deno.args.includes('--debug')) this.debug = true
    if (prefix) this.prefix = prefix
    this.token = token
    this.api = api || new ApiRequest(this.token)
    this.ws = new ClientWebSocket(this)
    this.events = !events ? {} : events == true ? {} : events
    this.guilds = new Guilds(this.token)
    this.channels = new Channels(this)
    this.connect = (token = this.token) => {
      this.ws.identify(token, intents)
    }

    handler(this)

    if (plugins) {
      plugins.forEach(plugin => {
        if (plugin instanceof Promise) {
          plugin.then(({ init }) => init(this))
          return
        }
        plugin.init(this)
      })
    }
  }

  setPresence = (presence: IPresence): void => {
    this.ws.send(
      JSON.stringify({
        op: Constants.OP.PRESENCE_UPDATE,
        d: new RawPresence(presence)
      })
    )
  }
}
