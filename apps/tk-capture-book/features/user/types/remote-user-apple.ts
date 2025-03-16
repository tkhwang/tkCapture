export interface AppleAuthAppMetadata {
  provider: string;
  providers: string[];
}

export interface AppleAuthCustomClaims {
  auth_time: number;
}

export interface AppleAuthUserMetadata {
  custom_claims: AppleAuthCustomClaims;
  email: string;
  email_verified: boolean;
  iss: string;
  phone_verified: boolean;
  provider_id: string;
  sub: string;
}

export interface AppleAuthIdentityData {
  custom_claims: AppleAuthCustomClaims;
  email: string;
  email_verified: boolean;
  iss: string;
  phone_verified: boolean;
  provider_id: string;
  sub: string;
}

export interface AppleAuthIdentity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: AppleAuthIdentityData;
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}

export interface AppleAuthUser {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  last_sign_in_at: string;
  app_metadata: AppleAuthAppMetadata;
  user_metadata: AppleAuthUserMetadata;
  identities: AppleAuthIdentity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

export interface IAppleAuthRemoteData {
  success: boolean;
  canceled?: boolean;
  error?: Error;
  user: AppleAuthUser;
}
