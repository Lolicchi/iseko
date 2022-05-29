import { Iseko } from '../client/client.ts'
import { ClientUser } from '../client/user.client.ts'
import { Member } from '../guild/member.guild.ts'
import { IPayload } from '../interfaces/IPayload.ts'
import { ClientEvents } from '../structures/ClientEvents.ts'
import { Guild } from '../structures/Guild.ts'
import { Constants } from '../utils/Constants.ts'
// import { Constants } from '../utils/Constants.ts'
// import { fetchRes } from '../utils/fetchRes.ts'

export const GatewayEvents: Record<
  keyof typeof Constants.Events,
  ({
    client,
    payload,
    eventRunner
  }: {
    client: Iseko
    payload: IPayload
    eventRunner: <Event extends keyof ClientEvents = keyof ClientEvents>(
      eventName: Event,
      ...eventArgs: ClientEvents[Event]
    ) => void
  }) => void
> = {
  READY: ({
    client,
    payload: {
      d: { user, session_id }
    },
    eventRunner
  }) => {
    eventRunner('login', client)
    client.user = new ClientUser(user)
    client.ws.sessionId = session_id
    eventRunner('ready', client)
  },
  GUILD_MEMBER_ADD: async ({
    client: {
      api: { getGuild }
    },
    payload: { d },
    eventRunner
  }) => {
    const guild = await getGuild(d.guild_id)

    if (!guild) return console.log('Err :: RATELIMITED')

    eventRunner('guildMemberAdd', new Member(d, new Guild(guild)))
  }
}
