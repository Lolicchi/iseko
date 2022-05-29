// deno-lint-ignore-file ban-types

import { type RawGuild } from '../structures/RawGuild.ts'

export class Guild {
  constructor(rawGuild: RawGuild<'Fetched'>) {
    this.id = rawGuild.id
    this.name = rawGuild.name
    this.icon = rawGuild.icon
    this.iconHash = rawGuild.icon_hash
    this.splash = rawGuild.splash
    this.discoverySplash = rawGuild.discovery_splash
    this.owner = rawGuild.owner
    this.ownerId = rawGuild.owner_id
    this.permissions = rawGuild.permissions
    this.afkChannelId = rawGuild.afk_channel_id
    this.afkTimeout = rawGuild.afk_timeout
    this.widgetEnabled = rawGuild.widget_enabled
    this.widgetChannelId = rawGuild.widget_channel_id
    this.verificationLevel = rawGuild.verification_level
    this.defaultMessageNotifications = rawGuild.default_message_notifications
    this.explicitContentFilter = rawGuild.explicit_content_filter
    this.roles = rawGuild.roles
    this.emojis = rawGuild.emojis
    this.features = rawGuild.features
    this.mfaLevel = rawGuild.mfa_level
    this.applicationId = rawGuild.application_id
    this.systemChannelId = rawGuild.system_channel_id
    this.systemChannelFlags = rawGuild.system_channel_flags
    this.rulesChannelId = rawGuild.rules_channel_id
    this.maxPresences = rawGuild.max_presences
    this.maxMembers = rawGuild.max_members
    this.vanityUrlCode = rawGuild.vanity_url_code
    this.description = rawGuild.description
    this.banner = rawGuild.banner
    this.premiumTier = rawGuild.premium_tier
    this.premiumSubscriptionCount = rawGuild.premium_subscription_count
    this.preferredLocale = rawGuild.preferred_locale
    this.publicUpdatesChannelId = rawGuild.public_updates_channel_id
    this.maxVideoChannelUsers = rawGuild.max_video_channel_users
    this.approximateMemberCount = rawGuild.approximate_member_count
    this.approximatePresenceCount = rawGuild.approximate_presence_count
    this.welcomeScreen = rawGuild.welcome_screen
    this.nsfwLevel = rawGuild.nsfw_level
    this.stickers = rawGuild.stickers
    this.premiumProgressBarEnabled = rawGuild.premium_progress_bar_enabled
  }

  id: string
  name: string
  icon: string | null
  iconHash: string | null | undefined
  splash: string | null
  discoverySplash: string | null
  owner: boolean
  ownerId: string
  permissions: string
  afkChannelId: string | null
  afkTimeout: number
  widgetEnabled: boolean | undefined
  widgetChannelId: string | null | undefined
  verificationLevel: number
  defaultMessageNotifications: number
  explicitContentFilter: number
  roles: {}[]
  emojis: {}[]
  features: {}[]
  mfaLevel: number
  applicationId: string | null
  systemChannelId: string | null
  systemChannelFlags: number
  rulesChannelId: string | null
  maxPresences: number | null | undefined
  maxMembers: number | undefined
  vanityUrlCode: string | null
  description: string | null
  banner: string | null
  premiumTier: number
  premiumSubscriptionCount: number | undefined
  preferredLocale: string
  publicUpdatesChannelId: string | null
  maxVideoChannelUsers: number | undefined
  approximateMemberCount: number | undefined
  approximatePresenceCount: number | undefined
  welcomeScreen: {}[] | undefined
  nsfwLevel: number
  stickers: {}[] | undefined
  premiumProgressBarEnabled: boolean
}
