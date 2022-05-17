import { Constants } from '../utils/Constants.ts'
import { Iseko } from './client.ts'

export class Voice {
  join: (voiceChannelId: string, guildId?: string) => void

  constructor(client: Iseko) {
    this.join = async voiceChannelId => {
      const channel = await client.channels.get(voiceChannelId)
      if (!channel) throw 'no channel'
      client.ws.send(
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
