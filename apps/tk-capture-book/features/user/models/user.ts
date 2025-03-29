import { User as SupabaseUser } from "@supabase/supabase-js";

import { SupabaseUserRepository } from "@/features/user/repository/supabase/supabase-user-repository";
import { IUser } from "@/features/user/types/user";

export type AuthProvider = "apple" | "google";

/**
 * Anti-Corruption Layer and class domain model
 *
 * @export
 * @class User
 * @implements {IUser}
 */
export class User implements IUser {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _provider: AuthProvider;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  private constructor(params: IUser) {
    this._id = params.id;
    this._name = params.name;
    this._provider = params.provider;
    this._createdAt = params.createdAt;
    this._updatedAt = params.updatedAt;
  }

  /*
   *  Getter
   */
  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get provider(): AuthProvider {
    return this._provider;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }

  /**
   * Factory method to create a User instance from database record
   *
   * @static
   * @param {Record<string, any>} userDB - Database record from Supabase
   * @return {User} User domain model instance
   */
  static fromDatabase(userDB: IUser): User {
    return new User({
      id: userDB.id,
      name: userDB.name,
      provider: userDB.provider as AuthProvider,
      createdAt: new Date(userDB.createdAt),
      updatedAt: new Date(userDB.updatedAt),
    });
  }

  static fromSupabaseAuth(supabaseUser: SupabaseUser, authProvider: AuthProvider): User {
    return new User({
      id: supabaseUser.id,
      name: supabaseUser.email ?? supabaseUser.user_metadata.email,
      provider: authProvider,
      createdAt: new Date(supabaseUser.created_at),
      updatedAt: new Date(supabaseUser.updated_at as string),
    });
  }

  /**
   * Find user in supabase and create if not there.
   *
   * @return {*}  {Promise<User>}
   * @memberof User
   */
  async findOrCreate(): Promise<User> {
    try {
      const userRepository = new SupabaseUserRepository();
      const savedUser = await userRepository.findOrCreate(this);

      console.log(`[+][User] User found or created successfully: ${savedUser.id}`);
      return User.fromDatabase(savedUser);
    } catch (error) {
      console.error(`[-][User] Failed to find or create user: ${JSON.stringify(error)}`);
      throw error;
    }
  }
}
