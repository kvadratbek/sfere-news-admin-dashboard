interface IAuthTokens {
  access_token: string;
  expires_in: string;
  session: ISession
}

interface IAuthRefreshTokenResponse {
  access_token: string;
  session: ISession
}

interface ISession {
  access_token: string;
  created_at: string;
  expires_at: string;
  id: string;
  ip_address: string;
  is_active: true;
  last_active_at: string;
  platform: string;
  updated_at: string;
  user_agent: string;
  user_id: number;
  user_pro_id: number;
}

export type { IAuthTokens, IAuthRefreshTokenResponse };
