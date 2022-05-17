import { RawUser } from '../interfaces/RawUser.ts'

export class User {
  id: string
  username: string
  discriminator: string
  avatar: string | null
  bot?: boolean | undefined
  system?: boolean | undefined
  mfaEnabled?: boolean | undefined
  banner?: string | null | undefined
  accentColor?: number | null | undefined
  locale?: string | undefined
  verified?: boolean | undefined
  email?: string | null | undefined
  flags?: number | undefined
  premiumType?: number | undefined
  publicFlags?: number | undefined

  constructor(user: RawUser) {
    this.id = user.id
    this.username = user.username
    this.discriminator = user.discriminator
    this.avatar = user.avatar
    this.bot = user.bot
    this.system = user.system
    this.mfaEnabled = user.mfa_enabled
    this.banner = user.banner
    this.accentColor = user.accent_color
    this.locale = user.locale
    this.verified = user.verified
    this.email = user.email
    this.flags = user.flags
    this.premiumType = user.premium_type
    this.publicFlags = user.public_flags
  }
}
