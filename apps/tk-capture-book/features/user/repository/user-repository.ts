import { User } from "@/features/user/models/user";

export interface IUserRepository {
  findOrCreate(user: User): Promise<User>;
}
