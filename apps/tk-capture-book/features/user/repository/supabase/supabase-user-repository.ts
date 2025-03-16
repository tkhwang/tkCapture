import { IUserRepository } from "@/features/user/repository/user-repository";
import { IUser, IUserDB } from "@/features/user/types/user";
import { supabase } from "@/lib/supabase";

export class SupabaseUserRepository implements IUserRepository {
  private mapToUser(userDB: IUserDB): IUser {
    return {
      id: userDB.id,
      name: userDB.name,
      provider: userDB.provider,
      createdAt: new Date(userDB.created_at),
      updatedAt: new Date(userDB.updated_at),
    };
  }

  private mapToUserDB(user: IUser): IUserDB {
    return {
      id: user.id,
      name: user.name,
      provider: user.provider,
      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt.toISOString(),
    };
  }

  /**
   *
   *
   * @param {User} user
   * @return {*}
   * @memberof SupabaseUserRepository
   */
  async findOrCreate(user: IUser): Promise<IUser> {
    try {
      const { data: existingUser, error: queryError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (queryError && queryError.code !== "PGRST116") {
        throw queryError;
      }

      const userDB: IUserDB | null = existingUser;

      if (userDB) {
        console.log(`[+][User] already existing User`);
        return this.mapToUser(userDB);
      }

      const { data: createdUser, error: insertError } = await supabase
        .from("users")
        .insert([this.mapToUserDB(user)])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      console.log(`[+][User] new user created: ${JSON.stringify(createdUser)}`);
      return createdUser;
    } catch (error) {
      console.error(`[-][User] create new user failed: ${JSON.stringify(error)}`);
      throw error;
    }
  }
}
