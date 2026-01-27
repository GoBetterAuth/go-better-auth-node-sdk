import { GoBetterAuthClient } from "./client";
import type { GoBetterAuthClientOptions, Plugin } from "./types";

// Helper to extract plugin methods
export type InferPluginMethods<P> = P extends { init: (client: any) => infer M }
  ? M
  : never;

export type ClientWithPlugins<T extends readonly Plugin[]> =
  GoBetterAuthClient & {
    [P in T[number] as P["id"]]: InferPluginMethods<P>;
  };

export function createClient<const T extends readonly Plugin[]>(
  options: Omit<GoBetterAuthClientOptions, "plugins"> & { plugins: T },
): ClientWithPlugins<T> {
  return new GoBetterAuthClient(options as any) as ClientWithPlugins<T>;
}
