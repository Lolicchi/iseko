import { ApiRequest } from '../structures/ApiRequest.ts'
import { Cacher } from '../structures/Cacher.ts'
import { Channel } from '../structures/Channel.ts'

export class Channels extends Cacher<typeof Channel> {
  constructor(api: ApiRequest) {
    super(api, Channel)

    this.send = this.send.bind(this)
  }

  send(
    channelId: string,
    message:
      | string
      | {
          message?: string
          // deno-lint-ignore no-explicit-any
          embeds?: Record<string, any>[]
          stickers?: string[]
        }
  ) {
    this.api.channels.send(channelId, message)
  }
}
