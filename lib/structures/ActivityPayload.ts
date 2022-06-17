// deno-lint-ignore-file ban-types
import { Activity } from './Activity.ts'
import { ActivityType } from './ActivityType.ts'

export class ActivityPayload {
  name: string
  type: ActivityType
  url?: ActivityPayload['type'] extends 1 ? string : null
  created_at = Date.now()
  timestamps?: {
    start?: number
    end?: number
  }
  application_id?: string
  details?: string | null
  state?: string | null
  emoji?: {} | null
  party?: {
    id?: string
    size?: [current: number, max: number]
  }
  assets?: {
    large_image?: string
    large_text?: string
    small_image?: string
    small_text?: string
  }
  secrets?: {
    join?: string
    spectate?: string
    match?: string
  }
  instance?: boolean
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
  buttons?:
    | {
        label: string
        url: string
      }[]

  constructor({ name, type }: Activity) {
    this.name = name
    this.type = type
  }

  static toUsable({ name, type, application_id }: ActivityPayload): Activity {
    return {
      name,
      type,
      ...(application_id && { applicationId: application_id })
    }
  }

  // this.activities = presence.activities.map(activity => ({
  //   name: activity.name,
  //   type: activity.type,
  //   url: activity.url,
  //   created_at: activity.createdAt ? activity.createdAt : Date.now(),
  //   timestamps: activity.timestamps,
  //   application_id: activity.applicationId,
  //   details: activity.details,
  //   state: activity.state,
  //   emoji: activity.emoji,
  //   party: activity.party,
  //   assets: activity.assets
  //     ? {
  //         large_image: activity.assets.largeImageId,
  //         large_text: activity.assets.largeImageText,
  //         small_image: activity.assets.smallImageId,
  //         small_text: activity.assets.smallImageText
  //       }
  //     : undefined,
  //   secrets: activity.secrets,
  //   instance: activity.instance,
  //   flags: activity.flags,
  //   buttons: activity.buttons
  // }))
}
