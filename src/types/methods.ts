import type { Session, User } from "./schemas";

export type GetMeResponse = {
  user: User;
  session: Session;
};

export type SignOutRequest = {
  sessionId?: string;
  signOutAll?: boolean;
};

export type SignOutResponse = {
  message: string;
};
