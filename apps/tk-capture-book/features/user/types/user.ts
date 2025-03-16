export type AuthProvider = "apple" | "google";

export interface IUserCommon {
  id: string;
  name: string;
  provider: AuthProvider;
}

export interface IUser extends IUserCommon {
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDB extends IUserCommon {
  created_at: string;
  updated_at: string;
}
