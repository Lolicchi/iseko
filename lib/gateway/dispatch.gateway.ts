import { ClientUser } from '../client/user.client.ts'
import { Member } from '../guild/member.guild.ts'
import { Payload } from '../interfaces/Payload.ts'
import { ClientEvents } from '../structures/ClientEvents.ts'
import { Guild } from '../structures/Guild.ts'
import { Iseko } from '../types/Iseko.ts'
import { Constants } from '../utils/Constants.ts'

export const GatewayEvents: Record<
  keyof typeof Constants.Events,
  (args: {
    client: Iseko.LoggedIn
    payload: Payload
    eventRunner: <Event extends keyof ClientEvents = keyof ClientEvents>(
      eventName: Event,
      ...eventArgs: ClientEvents[Event]
    ) => void
  }) => void
> = {
  READY: ({ client, payload: { d }, eventRunner }) => {
    eventRunner('login')
    // console.log(d)
    client.ws.sessionId = d.session_id

    const assert: (c: Iseko.LoggedIn) => asserts c is Iseko.Ready = c => {
      c.user = new ClientUser(d.user)
    }

    assert(client)

    eventRunner('ready', client)
  },
  MESSAGE_CREATE: ({ payload, eventRunner }) => {
    eventRunner('messageCreate', payload.d)
  },
  GUILD_MEMBER_ADD: async ({
    client: {
      api: {
        guilds: { get }
      }
    },
    payload: { d },
    eventRunner
  }) => {
    const guild = await get(d.guild_id)

    if (!guild) return console.log('Err :: RATELIMITED')

    eventRunner('guildMemberAdd', new Member(d, new Guild(guild)))
  },
  GUILD_MEMBER_REMOVE: async ({
    client: {
      api: {
        guilds: { get }
      }
    },
    payload: { d },
    eventRunner
  }) => {
    const guild = await get(d.guild_id)

    if (!guild) return console.log('Err :: RATELIMITED')

    eventRunner('guildMemberRemove', new Member(d, new Guild(guild)))
  }
}
