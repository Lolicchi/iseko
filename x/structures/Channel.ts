// deno-lint-ignore-file ban-types
import { RawChannel } from './RawChannel.ts'

export class Channel {
  constructor(rawChannel: RawChannel) {
    this.id = rawChannel.id
    this.type = rawChannel.type
    this.guildId = rawChannel.guild_id
    this.position = rawChannel.position
    this.permissionOverwrites = rawChannel.permission_overwrites
    this.name = rawChannel.name
    this.topic = rawChannel.topic
    this.nsfw = rawChannel.nsfw
    this.lastMessageId = rawChannel.last_message_id
    this.bitrate = rawChannel.bitrate
    this.userLimit = rawChannel.user_limit
    this.rateLimitPerUser = rawChannel.rate_limit_per_user
    this.recipients = rawChannel.recipients
    this.icon = rawChannel.icon
    this.ownerId = rawChannel.owner_id
    this.applicationId = rawChannel.application_id
    this.parentId = rawChannel.parent_id
    this.lastPinTimestamp = rawChannel.last_pin_timestamp
    this.rtcRegion = rawChannel.rtc_region
    this.videoQualityMode = rawChannel.video_quality_mode
    this.messageCount = rawChannel.message_count
    this.memberCount = rawChannel.member_count
    this.threadMetadata = rawChannel.thread_metadata
    this.member = rawChannel.member
    this.defaultAutoArchiveDuration = rawChannel.default_auto_archive_duration
    this.permissions = rawChannel.permissions
  }
  id: string
  type: number
  guildId: string
  position: number | undefined
  permissionOverwrites: {}[] | undefined
  name: string | undefined
  topic: string | null | undefined
  nsfw: boolean | undefined
  lastMessageId: string | null | undefined
  bitrate: number | undefined
  userLimit: number | undefined
  rateLimitPerUser: number | undefined
  recipients: {}[] | undefined
  icon: string | null | undefined
  ownerId: string | undefined
  applicationId: string | undefined
  parentId: string | null | undefined
  lastPinTimestamp: Date | null | undefined
  rtcRegion: string | null | undefined
  videoQualityMode: number | undefined
  messageCount: string | undefined
  memberCount: number | undefined
  threadMetadata: {}[] | undefined
  member: {}[] | undefined
  defaultAutoArchiveDuration: number | undefined
  permissions: string | undefined
}
