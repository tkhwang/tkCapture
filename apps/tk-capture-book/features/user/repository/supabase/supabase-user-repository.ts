import { User } from "@/features/user/models/user";
import { IUserRepository } from "@/features/user/repository/user-repository";
import { supabase } from "@/lib/supabase";

export class SupabaseUserRepository implements IUserRepository {
  /**
   *
   *
   * @param {User} user
   * @return {*}
   * @memberof SupabaseUserRepository
   */
  async findOrCreate(user: User) {
    try {
      const { data: existingUser, error: queryError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (queryError && queryError.code !== "PGRST116") {
        throw queryError;
      }

      if (existingUser) {
        console.log(`[+][User] already existing User`);
        return existingUser as User;
      }

      const { data: createdUser, error: insertError } = await supabase
        .from("users")
        .insert([user])
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
