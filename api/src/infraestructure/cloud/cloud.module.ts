import { Global, Module } from '@nestjs/common';
import { BucketServiceProvider } from './bucket/bucket.provider';

@Global()
@Module({
  providers: [BucketServiceProvider],
  exports: [BucketServiceProvider],
})
export class CloudModule {}
