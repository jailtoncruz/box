import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthenticationGuard } from '../../../../core/abstract/authetication/authentication.guard';
import { AuthenticationService } from '../../../../core/abstract/authetication/authentication.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../../../core/decorators/public';
import { Request } from 'express';

@Injectable()
export class AuthenticationBoxGuard implements IAuthenticationGuard {
  constructor(
    private authenticationService: AuthenticationService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest() as Request;
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    const payload = await this.authenticationService.getPayloadFromToken(token);
    const { box_id } = request.params;
    if (box_id !== payload.sub) return false;
    request['box'] = payload;

    return true;
  }
  extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
