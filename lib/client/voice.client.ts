import { Iseko } from '../types/Iseko.ts'
import { Constants } from '../utils/Constants.ts'

export class Voice {
  join: (voiceChannelId: string, guildId?: string) => void

  constructor(ws: Iseko.LoggedIn['ws'], channels: Iseko.LoggedIn['channels']) {
    this.join = async voiceChannelId => {
      const channel = await channels.get(voiceChannelId)
      if (!channel) throw 'no channel'
      ws.send(
        JSON.stringify({
          op: Constants.OP.VOICE_STATE_UPDATE,
          d: {
            guild_id: channel.guildId,
            channel_id: voiceChannelId,
            self_mute: true,
            self_deaf: false
          }
        })
      )
    }
  }
}
