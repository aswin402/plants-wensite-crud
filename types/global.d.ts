import type { CurrentServerUser } from "@stackframe/stack";

declare module "hono" {
  interface ContextVariableMap {
    user: CurrentServerUser;
  }
}
