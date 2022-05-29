import { Channel } from '../structures/Channel.ts'
import { Iseko } from './client.ts'

export class Channels {
  cache: Map<string, Channel> = new Map()
  get: (channelId: string) => Promise<Channel | undefined>
  send: (
    channelId: string,
    message: string | { message?: string; stickers?: string[] }
  ) => Promise<{ content: string }>

  constructor({
    api: {
      getChannel,
      channels: { send }
    }
  }: Iseko) {
    this.get = async channelId => {
      if (this.cache.has(channelId)) return this.cache.get(channelId)
      const rawChannel = await getChannel(channelId)
      return rawChannel ? new Channel(rawChannel) : undefined
    }

    this.send = send
  }

  // async send(channelId:string) {

  // }
}
