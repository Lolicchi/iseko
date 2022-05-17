import { RawUser } from '../interfaces/RawUser.ts'

export interface RawMember {
  user?: RawUser
  nick?: string | null
  avatar?: string | null
  roles: { id: string }['id'][]
  joined_at: Date
  premium_since?: Date | null
  deaf: boolean
  mute: boolean
  pending?: boolean
  permissions?: string
  communication_disabled_until: Date | false
}
