// deno-lint-ignore-file ban-types
import { ActivityType } from './ActivityType.ts'

// change activity options to activity items

export class ActivityOptions {
  type: ActivityType
  url?: string | null
  createdAt?: number
  timestamps?: {
    start?: number
    end?: number
  }
  applicationId?: string
  details?: string | null
  state?: string | null
  emoji?: {} | null
  party?: {
    id?: string
    size?: [number, number]
  }
  assets?: {
    largeImageId?: string
    largeImageText?: string
    smallImageId?: string
    smallImageText?: string
  }
  secrets?: {
    join: string
    spectate: string
    match: string
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
  buttons?: {
    label: string
    url: string
  }[]

  constructor(activityOptions?: {
    type?: ActivityType
    url?: string | null
    createdAt?: number
    timestamps?: {
      start?: number
      end?: number
    }
    applicationId?: string
    details?: string | null
    state?: string | null
    emoji?: {} | null
    party?: {
      id?: string
      size?: [number, number]
    }
    assets?: {
      largeImageId?: string
      largeImageText?: string
      smallImageId?: string
      smallImageText?: string
    }
    secrets?: {
      join: string
      spectate: string
      match: string
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
    buttons?: {
      label: string
      url: string
    }[]
  }) {
    this.type = activityOptions?.type || 0
  }
}
