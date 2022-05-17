import { RawGuild } from '../structures/RawGuild.ts'
import { Guild } from '../structures/Guild.ts'
import { Constants } from '../utils/Constants.ts'
import { fetchRes } from '../utils/fetchRes.ts'

export class Guilds {
  cache: Map<string, Guild> = new Map()
  fetch: (guildId: string) => Promise<Guild | undefined>

  constructor(token: string) {
    this.fetch = async (guildId: string) => {
      const guild = await fetchRes<RawGuild<'Fetched'>>(
        Constants.Endpoints.getGuild(guildId),
        token
      )

      if (!guild) return

      return new Guild(guild)
    }
  }
}
