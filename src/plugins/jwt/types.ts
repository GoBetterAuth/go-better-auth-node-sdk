export type TokenRefreshRequest = {
  refresh_token: string;
};

export type TokenRefreshResponse = {
  access_token: string;
  refresh_token: string;
};

export type JWTAlgorithm =
  | "eddsa"
  | "rs256"
  | "ps256"
  | "es256"
  | "es512"
  | "ecdh-es";

export type JWKSKey = {
  alg: JWTAlgorithm;
  crv: string;
  kid: string;
  kty: string;
  x: string;
};
