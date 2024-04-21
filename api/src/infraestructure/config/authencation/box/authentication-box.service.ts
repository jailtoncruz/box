import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthenticationService,
  IAuthenticationToken,
} from '../../../../core/abstract/authetication/authentication.service';
import { EnvironmentService } from '../../environment/environment.service';
import { IAuthenticationBoxPayload } from './interfaces/box-payload';

@Injectable()
export class AuthenticationBoxService implements IAuthenticationService {
  private tokenLifetime: number;
  private secret: string;
  constructor(
    private jwtService: JwtService,
    private environmentService: EnvironmentService,
  ) {
    this.tokenLifetime = 1000 * 60 * 60 * 8; // 8 hours
    this.secret = this.environmentService.getOrThrow('JWT_SECRET');
  }
  async getToken(
    payload: IAuthenticationBoxPayload,
  ): Promise<IAuthenticationToken> {
    const expireAt = Date.now() + this.tokenLifetime;
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: expireAt,
    });
    return {
      token,
      expireAt,
    };
  }

  async isTokenValid(token: string): Promise<boolean> {
    await this.getPayloadFromToken(token);
    return true;
  }

  async getPayloadFromToken(token: string): Promise<IAuthenticationBoxPayload> {
    try {
      return await this.jwtService.verifyAsync<IAuthenticationBoxPayload>(
        token,
        {
          secret: this.secret,
        },
      );
    } catch {
      throw new UnauthorizedException();
    }
  }
}
