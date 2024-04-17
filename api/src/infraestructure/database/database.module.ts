import { Global, Module } from '@nestjs/common';
import { DatabaseServiceProvider } from './database.provider';

@Global()
@Module({
  providers: [DatabaseServiceProvider],
  exports: [DatabaseServiceProvider],
})
export class DatabaseModule {}
