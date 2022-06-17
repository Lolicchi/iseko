import { Activity } from './Activity.ts'
import { PresenceOptions } from './PresenceOptions.ts'
import { PresencePayload } from './PresencePayload.ts'

export class Presence extends PresenceOptions {
  // activities: Activity[]

  constructor(
    public activities: Activity[],
    presenceOptions?: PresenceOptions
  ) {
    super(presenceOptions)

    // this.activities = activities.map(
    //   ([activity, activityOption]) => new Activity(activity, activityOption)
    // )
  }

  static toPayload(presence: Presence) {
    return new PresencePayload(presence)
  }
}
