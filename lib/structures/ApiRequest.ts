import { Constants } from '../utils/Constants.ts'
import { RawChannel } from './RawChannel.ts'
import { RawGuild } from './RawGuild.ts'

export class ApiRequest {
  getGuild: (guildId: string) => Promise<RawGuild<'Fetched'> | undefined>
  getChannel: (channelId: string) => Promise<RawChannel | undefined>
  channels: {
    send: (
      channelId: string,
      message: string | { message?: string; stickers?: string[] }
    ) => Promise<{ content: string }>
  }

  constructor(
    token: string,
    request: <T>(
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

      const res = await (
        await fetch(`${Constants.API}/${endpoint}`, {
          method: options.method,
          headers: {
            ...options.headers,
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify(options.body)
        })
      ).json()
      console.log(res)
      if (res.code && (res.code !== 200 || res.code !== 204)) throw res
      return res
    }
  ) {
    this.getGuild = async (guildId: string) =>
      <RawGuild<'Fetched'> | undefined>await request(`guilds/${guildId}`)

    this.getChannel = async (channelId: string) =>
      <RawChannel | undefined>await request(`channels/${channelId}`)

    this.channels = {
      send: async (
        channelId: string,
        message:
          | string
          | {
              message?: string
              stickers?: string[]
            }
      ) => {
        // do a check if atleast one of the required props is passed or ask how to declare types for that
        return <{ content: string }>(
          await request(`channels/${channelId}/messages`, {
            method: 'POST',
            body:
              typeof message == 'string'
                ? { content: message }
                : {
                    content: message.message,
                    sticker_ids: message.stickers
                  }
          })
        )
      }
    }
  }
}
