import { AppleAuthUser } from "../types/remote-user-apple";

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
   * @param {Record<string, any>} dbRecord - Database record from Supabase
   * @return {User} User domain model instance
   */
  static fromDatabase(dbRecord: Record<string, any>): User {
    return new User({
      id: dbRecord.id,
      name: dbRecord.name,
      provider: dbRecord.provider as AuthProvider,
      createdAt: new Date(dbRecord.created_at),
      updatedAt: new Date(dbRecord.updated_at),
    });
  }

  /**
   *
   *
   * @static
   * @param {AppleAuthUser} remoteAppleUser
   * @return {*}  {User}
   * @memberof User
   */
  static fromAppleAuth(remoteAppleUser: AppleAuthUser): User {
    return new User({
      id: remoteAppleUser.id,
      name: remoteAppleUser.email,
      provider: "apple",
      createdAt: new Date(remoteAppleUser.created_at),
      updatedAt: new Date(remoteAppleUser.updated_at),
    });
  }

  /**
   * Get a plain object representation of this User for database operations
   *
   * @return {Record<string, any>} Plain object suitable for database operations
   */
  toDatabase(): Record<string, any> {
    return {
      id: this._id,
      name: this._name,
      provider: this._provider,
      created_at: this._createdAt.toISOString(),
      updated_at: this._updatedAt.toISOString(),
    };
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
      return savedUser;
    } catch (error) {
      console.error(`[-][User] Failed to find or create user: ${JSON.stringify(error)}`);
      throw error;
    }
  }
}
