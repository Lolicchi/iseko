import { ActivityType } from './ActivityType.ts'
import { ActivityPayload } from './ActivityPayload.ts'
import { ActivityOptions } from './ActivityOptions.ts'

export class Activity extends ActivityOptions {
  constructor(public name: string, activityOptions?: ActivityOptions) {
    super(activityOptions)
  }

  static toPayload(activity: Activity) {
    return new ActivityPayload(activity)
  }

  static Type = ActivityType
}
