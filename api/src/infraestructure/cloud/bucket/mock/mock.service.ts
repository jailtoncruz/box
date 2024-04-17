import { Injectable } from '@nestjs/common';
import {
  BucketService,
  CreatePreSignedOptions,
  ListObjectOptions,
} from '../../../../core/abstract/cloud/bucket-service';

@Injectable()
export class MockBucketService extends BucketService {
  async createBucket(name: string): Promise<string> {
    return name.toLowerCase().replaceAll(' ', '_');
  }
  async createPresignedGetObject(
    options: CreatePreSignedOptions,
  ): Promise<string> {
    return options.bucketName;
  }
  async createPresignedPutObject(
    options: CreatePreSignedOptions,
  ): Promise<string> {
    return options.bucketName;
  }
  async deleteBucket(): Promise<void> {}
  async deleteObject(): Promise<void> {}
  async deleteObjects(): Promise<void> {}
  async isBucketExists(name: string): Promise<boolean> {
    return name ? true : false;
  }
  async listObjects(options: ListObjectOptions): Promise<any[]> {
    return [options];
  }
}
