import type { GoBetterAuthClient } from "../client";

export interface Plugin {
  readonly id: string;
  init(client: GoBetterAuthClient): any;
}
