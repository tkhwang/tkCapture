export interface AuthSignInResult {
  success: boolean;
  user?: any;
  canceled?: boolean;
  error?: Error;
}
