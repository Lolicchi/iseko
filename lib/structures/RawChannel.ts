// deno-lint-ignore-file ban-types
export interface RawChannel {
  id: string //snowflake	the id of this channel
  type: number //the type of channel
  guild_id: string //snowflake	the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
  position: number | undefined //sorting position of the channel
  permission_overwrites: {}[] | undefined //array of overwrite objects	explicit permission overwrites for members and roles
  name: string | undefined //the name of the channel (1-100 characters)
  topic: string | null | undefined //the channel topic (0-1024 characters)
  nsfw: boolean | undefined //whether the channel is nsfw
  last_message_id: string | null | undefined //?snowflake	the id of the last message sent in this channel (may not point to an existing or valid message)
  bitrate: number | undefined //the bitrate (in bits) of the voice channel
  user_limit: number | undefined //the user limit of the voice channel
  rate_limit_per_user: number | undefined //integer	amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission manage_messages or manage_channel, are unaffected
  recipients: {}[] | undefined //array of user objects	the recipients of the DM
  icon: string | null | undefined //?string	icon hash of the group DM
  owner_id: string | undefined //snowflake	id of the creator of the group DM or thread
  application_id: string | undefined //snowflake	application id of the group DM creator if it is bot-created
  parent_id: string | null | undefined //?snowflake	for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
  last_pin_timestamp: Date | null | undefined //?ISO8601 timestamp	when the last pinned message was pinned. This may be null in events such as GUILD_CREATE when a message is not pinned.
  rtc_region: string | null | undefined //?string	voice region id for the voice channel, automatic when set to null
  video_quality_mode: number | undefined //integer	the camera video quality mode of the voice channel, 1 when not present
  message_count: string | undefined //integer	an approximate count of messages in a thread, stops counting at 50
  member_count: number | undefined //integer	an approximate count of users in a thread, stops counting at 50
  thread_metadata: {}[] | undefined //a thread metadata object	thread-specific fields not needed by other channels
  member: {}[] | undefined //a thread member object	thread member object for the current user, if they have joined the thread, only included on certain API endpoints
  default_auto_archive_duration: number | undefined //integer	default duration that the clients (not the API) will use for newly created threads, in minutes, to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080
  permissions: string | undefined //string	computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a slash command interaction
}
