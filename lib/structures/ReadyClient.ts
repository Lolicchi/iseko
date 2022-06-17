import { Channels } from '../client/channels.client.ts'
import { Guilds } from '../client/guilds.client.ts'
import { ClientUser } from '../client/user.client.ts'
import { Voice } from '../client/voice.client.ts'
import { Payload } from '../interfaces/Payload.ts'
import { LoggedInClient } from './LoggedInClient.ts'

export class ReadyClient {
  api
  channels
  events?
  guilds
  plugins?
  prefix?
  user
  voice = new Voice(this)
  ws

  constructor(client: LoggedInClient, payload: Payload) {
    this.channels = new Channels((this.api = client.api))
    client.events && (this.events = client.events)
    this.guilds = new Guilds(client.api)
    client.plugins && (this.plugins = client.plugins)
    client.prefix && (this.prefix = client.prefix)
    this.user = new ClientUser(payload.d)
    this.ws = client.ws
  }
}
