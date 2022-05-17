import { Member } from '../guild/member.guild.ts'
import { GatewayEvent } from '../structures/GatewayEvent.ts'
import { Guild } from '../structures/Guild.ts'
import { RawGuild } from '../structures/RawGuild.ts'
import { Constants } from '../utils/Constants.ts'
import { fetchRes } from '../utils/fetchRes.ts'

export default new GatewayEvent(async args => {
  const guild = await fetchRes<RawGuild<'Fetched'>>(
    Constants.Endpoints.getGuild(args.payload.d.guild_id),
    args.client.token
  )

  if (!guild) return

  args.eventRunner(
    'guildMemberUpdate',
    new Member(args.payload.d, new Guild(guild))
  )
})
