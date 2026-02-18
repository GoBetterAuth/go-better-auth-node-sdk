export type MagicLinkSignInRequest = {
  email: string;
  name?: string;
  callbackUrl?: string;
};

export type MagicLinkSignInResponse = {
  message: string;
};

export type MagicLinkVerifyRequest = {
  token: string;
  callbackUrl?: string;
};

export type MagicLinkVerifyResponse = {
  message: string;
  token: string;
};

export type MagicLinkExchangeRequest = {
  token: string;
};
