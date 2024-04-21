import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface IAuthenticationGuard extends CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean>;
  extractTokenFromHeader(request: Request): string | undefined;
}

export abstract class AuthenticationGuard implements IAuthenticationGuard {
  canActivate(context: ExecutionContext): Promise<boolean> {
    throw new Error('Method not implemented.' + context.getType());
  }
  extractTokenFromHeader(request: Request): string {
    throw new Error('Method not implemented.' + request.accepted);
  }
}
