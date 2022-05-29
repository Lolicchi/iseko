import { Guild } from '../structures/Guild.ts'
import { User } from '../users/user.users.ts'
import { RawMember } from './member.guild.raw.ts'

export class Member {
  user?: User | undefined
  nickname?: string | null | undefined
  avatar?: string | null | undefined
  roles: { id: string }['id'][]
  joinedAt: Date
  boostingSince?: Date | null | undefined
  deafened: boolean
  muted: boolean
  pending?: boolean | undefined
  permissions?: string | undefined
  timeout: Date | false
  guild: Guild

  constructor(rawMember: RawMember, guild: Guild) {
    this.user = rawMember.user ? new User(rawMember.user) : undefined
    this.nickname = rawMember.nick
    this.avatar = rawMember.avatar
    this.roles = rawMember.roles
    this.joinedAt = rawMember.joined_at
    this.deafened = rawMember.deaf
    this.muted = rawMember.mute
    this.pending = rawMember.pending
    this.permissions = rawMember.permissions
    this.timeout = rawMember.communication_disabled_until
    this.guild = guild
  }
}
