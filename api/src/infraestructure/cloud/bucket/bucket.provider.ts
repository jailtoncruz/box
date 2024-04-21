import { Provider } from '@nestjs/common';
import { BucketService } from '../../../core/abstract/cloud/bucket-service';
import { EnvironmentService } from '../../config/environment/environment.service';
import { MinioService } from './minio/minio.service';
import { MockBucketService } from './mock/mock.service';

export const BucketServiceProvider: Provider = {
  provide: BucketService,
  useFactory: (environmentService: EnvironmentService) => {
    switch (environmentService.getNodeEnvironment()) {
      case 'production':
      case 'development':
        return new MinioService(environmentService);
      default:
        return new MockBucketService();
    }
  },
  inject: [EnvironmentService],
};
