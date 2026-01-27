/**
 * OAuth2 provider types supported by GoBetterAuth
 */
export type OAuth2ProviderType = "discord" | "github" | "google";

/**
 * OAuth2 authorization options
 */
export type SignInWithOAuth2Request = {
  /** OAuth2 provider to use */
  provider: OAuth2ProviderType;
  redirect_to?: string;
};

export type SignInWithOAuth2Response = {
  auth_url: string;
};
