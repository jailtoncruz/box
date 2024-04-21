import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationBoxGuard } from './authentication-box.guard';
import { AuthenticationService } from '../../../../core/abstract/authetication/authentication.service';
import { AuthenticationBoxService } from './authentication-box.service';
import { EnvironmentService } from '../../environment/environment.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (environementService: EnvironmentService) => ({
        secret: environementService.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '8 hour' },
      }),
      inject: [EnvironmentService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationBoxGuard,
    },
    {
      provide: AuthenticationService,
      useClass: AuthenticationBoxService,
    },
  ],
  exports: [
    {
      provide: AuthenticationService,
      useClass: AuthenticationBoxService,
    },
  ],
})
export class AutheticationBoxModule {}
