import { Injectable } from '@nestjs/common';
import { BucketItem, Client } from 'minio';
import {
  BucketService,
  CreatePreSignedOptions,
  ListObjectOptions,
} from '../../../../core/abstract/cloud/bucket-service';
import { EnvironmentService } from '../../../config/environment/environment.service';

@Injectable()
export class MinioService extends BucketService {
  client: Client;
  constructor(private environmentService: EnvironmentService) {
    super();
    this.client = new Client({
      endPoint: this.environmentService.getOrThrow('MINIO_ENDPOINT'),
      port: Number(this.environmentService.get('MINIO_PORT') ?? 9000),
      useSSL: true,
      accessKey: this.environmentService.getOrThrow('MINIO_ACCESS_KEY'),
      secretKey: this.environmentService.getOrThrow('MINIO_SECRET_KEY'),
    });
  }

  async createBucket(name: string): Promise<string> {
    await this.client.makeBucket(name, 'sa-saopaulo-1', {
      ObjectLocking: true,
    });
    return name;
  }

  async isBucketExists(name: string): Promise<boolean> {
    return await this.client.bucketExists(name);
  }

  async deleteBucket(name: string): Promise<void> {
    await this.client.removeBucket(name);
  }

  listObjects({
    bucketName,
    prefix,
    recursive,
  }: ListObjectOptions): Promise<BucketItem[]> {
    return new Promise<BucketItem[]>((resolve, reject) => {
      const data: BucketItem[] = [];
      const stream = this.client.listObjectsV2(bucketName, prefix, recursive);
      stream.on('data', (obj) => data.push(obj));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(data));
    });
  }
  async deleteObjects(bucketName: string, objects: string[]): Promise<void> {
    await this.client.removeObjects(bucketName, objects);
  }
  async deleteObject(bucketName: string, object: string): Promise<void> {
    await this.client.removeObject(bucketName, object);
  }
  async createPresignedGetObject({
    bucketName,
    object,
    expireAt,
  }: CreatePreSignedOptions): Promise<string> {
    return await this.client.presignedGetObject(bucketName, object, expireAt);
  }

  async createPresignedPutObject({
    bucketName,
    object,
    expireAt,
  }: CreatePreSignedOptions): Promise<string> {
    return await this.client.presignedPutObject(bucketName, object, expireAt);
  }
}
