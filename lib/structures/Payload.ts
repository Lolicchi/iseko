import { OpCode } from './OpCode.ts'

export class Payload {
  constructor(public op: OpCode) {}
}
