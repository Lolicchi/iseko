import { type GatewayPayload } from '../structures/GatewayPayload.ts'
import { type Event } from '../structures/Event.ts'
import { type GatewayEvent } from '../structures/GatewayEvent.ts'

export interface IModule {
  run: GatewayPayload['run'] | GatewayEvent['run'] | Event['run']
}

export type IMod = typeof Event
