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
  events?: Partial<{
    [Key in keyof ClientEvents]: (
      args: { client: Iseko } & ClientEvents[Key]
    ) => void
  }> //& { dir: string | boolean }
  constructor(options: {
    token: string
    intents?: string[] | number
    events?:
      | Partial<{
          [Key in keyof ClientEvents]: ({
            client,
            ...args
          }: { client: Iseko } & ClientEvents[Key]) => void
        }> //& { dir: string | boolean }
      | boolean
      | undefined
    debug?: boolean
  }) {
    if ((options && options.debug) || Deno.args.includes('--debug'))
      this.debug = true

    handler(this)

    this.ws = new ClientWebSocket(this)
    this.events = !options.events
      ? {}
      : options.events == true
      ? {}
      : options.events
    this.token = options.token
    this.guilds = new Guilds(this.token)
    this.channels = new Channels(this.token)
    this.connect = (token = this.token) => {
      this.ws.identify(token, options.intents)
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
