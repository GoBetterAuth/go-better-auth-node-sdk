export type CookieStore = {
  getAll(): { name: string; value: string }[];
  set(name: string, value: string, options?: Record<string, any>): void;
  delete?(name: string): void;
};

export type CookieProvider = (() => Promise<CookieStore>) | (() => CookieStore);
