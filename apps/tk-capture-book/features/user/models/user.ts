import { AppleAuthUser } from "../types/remote-user-apple";

import { IUser } from "@/features/user/types/user";
import { supabase } from "@/lib/supabase";

export type AuthProvider = "apple" | "google";

/**
 * Anti-Corruption Layer and class domain model
 *
 * @export
 * @class User
 * @implements {IUser}
 */
// export class User implements IUser {
export class User {
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

  // Apple OAuth factory method
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
   * Supabase users 테이블에서 사용자를 찾고, 없으면 새로 생성합니다.
   * @returns 데이터베이스에서 찾거나 생성된 사용자 정보
   */
  async findOrCreateInSupabase() {
    try {
      const { data: existingUser, error: queryError } = await supabase
        .from("users")
        .select("*")
        .eq("id", this._id)
        .single();

      if (queryError && queryError.code !== "PGRST116") {
        throw queryError;
      }

      if (existingUser) {
        console.log(`[+][User] already existing User`);
        return existingUser;
      }

      const newUser = {
        id: this._id,
        name: this._name,
        provider: this._provider,
        created_at: this._createdAt.toISOString(),
        updated_at: this._updatedAt.toISOString(),
      };

      const { data: createdUser, error: insertError } = await supabase
        .from("users")
        .insert([newUser])
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
