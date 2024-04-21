export interface IAuthenticationTokenPayload {
  sub: string;
}

export interface IAuthenticationToken {
  token: string;
  expireAt: number;
}

export interface IAuthenticationService {
  getToken(payload: IAuthenticationTokenPayload): Promise<IAuthenticationToken>;
  getPayloadFromToken(token: string): Promise<IAuthenticationTokenPayload>;
  isTokenValid(token: string): Promise<boolean>;
}

export abstract class AuthenticationService implements IAuthenticationService {
  getToken(
    payload: IAuthenticationTokenPayload,
  ): Promise<IAuthenticationToken> {
    throw new Error('Method not implemented.' + JSON.stringify(payload));
  }
  getPayloadFromToken(token: string): Promise<IAuthenticationTokenPayload> {
    throw new Error('Method not implemented.' + token);
  }
  isTokenValid(token: string): Promise<boolean> {
    throw new Error('Method not implemented.' + token);
  }
}
