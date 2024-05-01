import { Provider } from '@nestjs/common';
import { BucketService } from '../../../core/abstract/cloud/bucket-service';
import { EnvironmentService } from '../../config/environment/environment.service';
import { MinioService } from './minio/minio.service';
import { MockBucketService } from './mock/mock.service';
import { CloudFlareR2Service } from '../cloudflare/bucket/r2.service';

export const BucketServiceProvider: Provider = {
  provide: BucketService,
  useFactory: (environmentService: EnvironmentService) => {
    switch (environmentService.getNodeEnvironment()) {
      case 'production':
        return new CloudFlareR2Service(environmentService);
      case 'development':
        return new MinioService(environmentService);
      case 'test':
        return new MockBucketService();
      default:
        return new MockBucketService();
    }
  },
  inject: [EnvironmentService],
};
