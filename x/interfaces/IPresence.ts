// deno-lint-ignore-file ban-types
import { type Constants } from '../utils/Constants.ts'

export interface IPresence {
  since?: number | null //
  activities: {
    name: string
    type:
      | keyof typeof Constants.Presence
      | typeof Constants.Presence[keyof typeof Constants.Presence]
    url?: string | null
    createdAt?: number //
    timestamps?: {
      start?: number
      end?: number
    }
    applicationId?: string // snowflake
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
  }[]
  status?: 'online' | 'dnd' | 'idle' | 'invisible' | 'offline' //
  afk?: boolean //
}
