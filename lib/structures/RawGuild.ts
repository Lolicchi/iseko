// deno-lint-ignore-file ban-types
// import { type IPartialGuild } from "./IPartialGuild.ts";

export interface RawGuild<Origin extends 'Recieved' | 'Fetched'> {
  id: string //snowflake	//guild id
  name: string //guild name (2-100 characters, excluding trailing and leading whitespace)
  icon: string | null //icon hash
  icon_hash?: string | null //icon hash, returned when in the template object
  splash: string | null //splash hash
  discovery_splash: string | null //discovery splash hash; only present for guilds with the "DISCOVERABLE" feature
  owner: Origin extends 'Fetched' ? boolean : never //true if the user is the owner of the guild
  owner_id: string //snowflake	//id of owner
  permissions: Origin extends 'Fetched' ? string : never //total permissions for the user in the guild (excludes overwrites)
  //region? ***	?string	//voice region id for the guild (deprecated)
  afk_channel_id: string | null //?snowflake	//id of afk channel
  afk_timeout: number //afk timeout in seconds
  widget_enabled?: boolean //true if the server widget is enabled
  widget_channel_id?: string | null //?snowflake	//the channel id that the widget will generate an invite to, or null if set to no invite
  verification_level: number //verification level required for the guild
  default_message_notifications: number //default message notifications level
  explicit_content_filter: number //explicit content filter level
  roles: {}[] //array of role objects	//roles in the guild
  emojis: {}[] //array of emoji objects	//custom guild emojis
  features: {}[] //array of guild feature strings	//enabled guild features
  mfa_level: number //required MFA level for the guild
  application_id: string | null //?snowflake	//application id of the guild creator if it is bot-created
  system_channel_id: string | null //?snowflake	//the id of the channel where guild notices such as welcome messages and boost events are posted
  system_channel_flags: number //system channel flags
  rules_channel_id: string | null //?snowflake	//the id of the channel where Community guilds can display rules and/or guidelines
  joined_at: Origin extends 'Recieved' ? Date : never //ISO8601 timestamp	when this guild was joined at
  large: Origin extends 'Recieved' ? boolean : never //true if this is considered a large guild
  unavailable: Origin extends 'Recieved' ? boolean : never //true if this guild is unavailable due to an outage
  member_count: Origin extends 'Recieved' ? number : never //total number of members in this guild
  voice_states: Origin extends 'Recieved' ? {}[] : never //array of partial voice state objects	//states of members currently in voice channels; lacks the guild_id key
  members: Origin extends 'Recieved' ? {}[] : never //array of guild member objects	//users in the guild
  channels: Origin extends 'Recieved' ? {}[] : never //array of channel objects	//channels in the guild
  threads: Origin extends 'Recieved' ? {}[] : never //array of channel objects	//all active threads in the guild that current user has permission to view
  presences: Origin extends 'Recieved' ? {}[] : never //array of partial presence update objects	//presences of the members in the guild, will only include non-offline members if the size is greater than large threshold
  max_presences?: number | null //the maximum number of presences for the guild (null is always returned, apart from the largest of guilds)
  max_members?: number //the maximum number of members for the guild
  vanity_url_code: string | null //the vanity url code for the guild
  description: string | null //the description of a Community guild
  banner: string | null //banner hash
  premium_tier: number //premium tier (Server Boost level)
  premium_subscription_count?: number //the number of boosts this guild currently has
  preferred_locale: string //the preferred locale of a Community guild; used in server discovery and notices from Discord, and sent in interactions; defaults to "en-US"
  public_updates_channel_id: string | null //?snowflake	//the id of the channel where admins and moderators of Community guilds receive notices from Discord
  max_video_channel_users?: number //the maximum amount of users in a video channel
  approximate_member_count?: number //approximate number of members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true
  approximate_presence_count?: number //approximate number of non-offline members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true
  welcome_screen?: {}[] //welcome screen object	//the welcome screen of a Community guild, shown to new members, returned in an Invite's guild object
  nsfw_level: number //guild NSFW level
  stage_instances?: Origin extends 'Recieved' ? {}[] : never //array of stage instance 	//Stage instances in the guild
  stickers?: {}[] //array of sticker objects	//custom guild stickers
  guild_scheduled_events?: Origin extends 'Recieved' ? {}[] : never //array of guild scheduled event objects	//the scheduled events in the guild
  premium_progress_bar_enabled: boolean //whether the guild has the boost progress bar enabled
}
