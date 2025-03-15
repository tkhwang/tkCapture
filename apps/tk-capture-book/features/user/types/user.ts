export type AuthProvider = "apple" | "google";

export interface IUser {
  id: string;
  name: string;
  provider: AuthProvider;
  createdAt: Date;
  updatedAt: Date;
}
