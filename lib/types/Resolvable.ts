// deno-lint-ignore-file no-explicit-any
export type Resolvable<Struct extends new (...args: any) => any> =
  | [InstanceType<Struct>]
  | ConstructorParameters<Struct>
