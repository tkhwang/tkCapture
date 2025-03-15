import { IAppleAuthRemoteData, AppleAuthUser } from "../types/remote-user";

import { IUser } from "@/features/user/types/user";
// import { IGoogleAuthRemoteData, GoogleAuthUser } from "../types/remote-user"; // 추후 구현 필요

export type AuthProvider = "apple" | "google";

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
  static fromAppleAuth(appleData: IAppleAuthRemoteData): User {
    if (!appleData.user) {
      throw new Error("Invalid Apple user data");
    }

    const user: AppleAuthUser = appleData.user;

    return new User({
      id: user.id,
      name: user.email,
      provider: "apple",
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    });
  }
}
