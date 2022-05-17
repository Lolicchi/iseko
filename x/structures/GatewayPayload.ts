import { type Iseko } from "../client/client.ts";
import { type IPayload } from "../interfaces/IPayload.ts";

export class GatewayPayload {
  run: (args: { client: Iseko; payload: IPayload }) => void;

  constructor(run: (args: { client: Iseko; payload: IPayload }) => void) {
    this.run = run;
  }
}
