import { Member } from '../guild/member.guild.ts'
import { GatewayEvent } from '../structures/GatewayEvent.ts'
import { Guild } from '../structures/Guild.ts'
// import { RawGuild } from '../structures/RawGuild.ts'
// import { Constants } from '../utils/Constants.ts'
// import { fetchRes } from '../utils/fetchRes.ts'

export default new GatewayEvent(({ payload, eventRunner }) => {
  eventRunner(
    'guildMemberAdd',
    new Member(payload.d, new Guild(payload.d.guild))
  )
})
