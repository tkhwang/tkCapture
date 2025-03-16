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
  async findOrCreate(user: User): Promise<User> {
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
        // Convert database record to User domain model
        return User.fromDatabase(existingUser);
      }

      // Convert User domain model to plain object for database insertion
      const userForDb = user.toDatabase();

      const { data: createdUser, error: insertError } = await supabase
        .from("users")
        .insert([userForDb])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      console.log(`[+][User] new user created: ${JSON.stringify(createdUser)}`);
      // Convert database record to User domain model
      return User.fromDatabase(createdUser);
    } catch (error) {
      console.error(`[-][User] create new user failed: ${JSON.stringify(error)}`);
      throw error;
    }
  }
}
