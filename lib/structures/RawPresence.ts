// deno-lint-ignore-file ban-types
import { IPresence } from '../interfaces/IPresence.ts'
import { Constants } from '../utils/Constants.ts'

export class RawPresence {
  since: number | null
  activities: {
    name: string
    type:
      | keyof typeof Constants.Presence
      | typeof Constants.Presence[keyof typeof Constants.Presence]
    url?: string | null | undefined
    created_at: number
    timestamps?:
      | {
          start?: number
          end?: number
        }
      | undefined
    application_id?: string | undefined // snowflake
    details?: string | null | undefined
    state?: string | null | undefined
    emoji?: {} | null | undefined
    party?:
      | {
          id?: string
          size?: [number, number]
        }
      | undefined
    assets?:
      | {
          large_image?: string | undefined
          large_text?: string | undefined
          small_image?: string | undefined
          small_text?: string | undefined
        }
      | undefined
    secrets?:
      | {
          join: string
          spectate: string
          match: string
        }
      | undefined
    instance?: boolean | undefined
    flags?:
      | number
      | 'INSTANCE'
      | 'JOIN'
      | 'SPECTATE'
      | 'JOIN_REQUEST'
      | 'SYNC'
      | 'PLAY'
      | 'PARTY_PRIVACY_FRIENDS'
      | 'PARTY_PRIVACY_VOICE_CHANNEL'
      | 'EMBEDDED'
      | undefined
    buttons?:
      | {
          label: string
          url: string
        }[]
      | undefined
  }[]
  status: 'online' | 'dnd' | 'idle' | 'invisible' | 'offline'
  afk: boolean

  constructor(presence: IPresence) {
    this.since = presence.since ? presence.since : null

    this.activities = presence.activities.map(activity => ({
      name: activity.name,
      type: activity.type,
      url: activity.url,
      created_at: activity.createdAt ? activity.createdAt : Date.now(),
      timestamps: activity.timestamps,
      application_id: activity.applicationId,
      details: activity.details,
      state: activity.state,
      emoji: activity.emoji,
      party: activity.party,
      assets: activity.assets
        ? {
            large_image: activity.assets.largeImageId,
            large_text: activity.assets.largeImageText,
            small_image: activity.assets.smallImageId,
            small_text: activity.assets.smallImageText
          }
        : undefined,
      secrets: activity.secrets,
      instance: activity.instance,
      flags: activity.flags,
      buttons: activity.buttons
    }))

    this.status = presence.status ? presence.status : 'online'

    this.afk = presence.afk ? presence.afk : false
  }
}
