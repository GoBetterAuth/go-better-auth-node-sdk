export type FetchContext = {
  url: string;
  init: RequestInit;
  /** internal metadata for plugins */
  meta: {
    retry?: boolean;
  };
};

export type BeforeFetchHook = (ctx: FetchContext) => Promise<void> | void;

export type AfterFetchHook = (
  ctx: FetchContext,
  res: Response,
) => Promise<"retry" | void> | "retry" | void;

/**
 * Fetch options for internal API calls
 */
export type FetchRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  callbackUrl?: string;
};
