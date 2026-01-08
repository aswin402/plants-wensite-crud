
// OR whatever auth lib you use that is NOT Next-specific

import { stackServerApp } from "@/stack/server";

export async function getUserFromRequest(req: Request) {
  return stackServerApp.getUser({
    headers: req.headers,
  });
}
