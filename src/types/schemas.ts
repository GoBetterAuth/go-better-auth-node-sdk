import { z } from "zod";

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string().nonempty(),
  email: z.email(),
  email_verified: z.boolean(),
  image: z.string().nullish(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});
export type User = z.infer<typeof userSchema>;

export const accountSchema = z.object({
  id: z.uuid(),
  user_id: z.string().nonempty(),
  account_id: z.string().nonempty(),
  provider_id: z.string().nonempty(),
  access_token: z.string().nullish(),
  refresh_token: z.string().nullish(),
  id_token: z.string().nullish(),
  access_token_expires_at: z.iso.datetime().nullish(),
  refresh_token_expires_at: z.iso.datetime().nullish(),
  scope: z.string().nullish(),
  password: z.string().nullish(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});
export type Account = z.infer<typeof accountSchema>;

export const sessionSchema = z.object({
  id: z.uuid(),
  user_id: z.string().nonempty(),
  token: z.string().nonempty(),
  expires_at: z.iso.datetime(),
  ip_address: z.string().nullish(),
  user_agent: z.string().nullish(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});
export type Session = z.infer<typeof sessionSchema>;

export const verificationTypeSchema = z.enum([
  "email_verification",
  "password_reset_request",
  "email_reset_request",
]);
export type VerificationType = z.infer<typeof verificationTypeSchema>;

export const verificationSchema = z.object({
  id: z.uuid(),
  user_id: z.string().nullish(),
  identifier: z.string().nonempty(),
  token: z.string().nonempty(),
  type: verificationTypeSchema,
  expires_at: z.iso.datetime(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});
export type Verification = z.infer<typeof verificationSchema>;
