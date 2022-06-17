import { type Constants } from '../utils/Constants.ts'

export interface Payload {
  t: string | null //keyof typeof Constants.Events | null
  s: number | null
  op: typeof Constants.OP[keyof typeof Constants.OP]
  // deno-lint-ignore no-explicit-any
  d: any
}

// export interface Payload<
//   OP extends typeof Constants.OP[keyof typeof Constants.OP] = 0,
//   T extends typeof Constants.Events[keyof typeof Constants.Events] | null = null
// > {
//   t: T
//   s: string | null
//   op: OP
//   // deno-lint-ignore no-explicit-any
//   d: any
// }
