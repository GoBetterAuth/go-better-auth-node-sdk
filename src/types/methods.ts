import type { Session, User } from "./schemas";

export type GetMeResponse = {
  user: User;
  session: Session;
};

export type SignOutRequest = {
  session_id?: string;
  sign_out_all?: boolean;
};

export type SignOutResponse = {
  message: string;
};
