import { RawChannel } from '../structures/RawChannel.ts'
import { Channel } from '../structures/Channel.ts'
import { Constants } from '../utils/Constants.ts'
import { fetchRes } from '../utils/fetchRes.ts'

export class Channels {
  cache: Map<string, Channel> = new Map()
  get: (voiceChannelId: string) => Promise<Channel | undefined>

  constructor(token: string) {
    this.get = async channelId => {
      if (this.cache.has(channelId)) return this.cache.get(channelId)
      const rawChannel = await fetchRes<RawChannel>(
        Constants.Endpoints.getChannel(channelId),
        token
      )
      return rawChannel ? new Channel(rawChannel) : undefined
    }
  }

  // async send(channelId:string) {

  // }
}
