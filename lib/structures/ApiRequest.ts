import { Constants } from '../utils/Constants.ts'
import { RawChannel } from './RawChannel.ts'
import { RawGuild } from './RawGuild.ts'

export class ApiRequest {
  guilds = {
    get: async (guildId?: string) => {
      return <RawGuild<'Fetched'> | undefined>(
        await this.request(
          guildId
            ? Constants.Endpoints.getGuild(guildId)
            : Constants.Endpoints.getGuilds
        )
      )
    }
  }

  channels = {
    get: async (channelId: string) => {
      return <RawChannel | undefined>(
        await this.request(Constants.Endpoints.getChannel(channelId))
      )
    },
    send: async (
      channelId: string,
      message:
        | string
        | {
            message?: string
            // deno-lint-ignore no-explicit-any
            embeds?: Record<string, any>[]
            stickers?: string[]
          }
    ) => {
      // do a check if atleast one of the required props is passed or ask how to declare types for that
      return <{ content: string }>await this.request(
        `channels/${channelId}/messages`,
        {
          method: 'POST',
          body:
            typeof message == 'string'
              ? { content: message }
              : {
                  content: message.message,
                  sticker_ids: message.stickers,
                  embeds: message.embeds
                }
        }
      )
    }
  }

  constructor(
    token: string,
    private request: <T>(
      endpoint: string,
      options?:
        | {
            headers?: HeadersInit
            method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
            body?: Record<string, unknown> | null
          }
        | undefined
    ) => Promise<T> = async <T>(
      endpoint: string,
      options?: {
        headers?: HeadersInit
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
        body?: Record<string, unknown> | null
      }
    ): Promise<T> => {
      if (!options) options = { method: 'GET', body: null }
      if (!options.method) options.method = 'GET'
      if (!options.body) options.body = null

      const res = await fetch(`${Constants.API}/${endpoint}`, {
        method: options.method,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(options.body)
      })

      // console.log(res)
      if (!res.ok) throw res
      return await res.json()
    }
  ) {}
}
