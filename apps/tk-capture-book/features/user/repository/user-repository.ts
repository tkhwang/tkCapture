import { IUser } from "@/features/user/types/user";

export interface IUserRepository {
  findOrCreate(user: IUser): Promise<IUser>;
}
