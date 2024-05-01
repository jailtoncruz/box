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
  private client: Client;
  private bucketName: string;
  constructor(private environmentService: EnvironmentService) {
    super();
    this.client = new Client({
      endPoint: this.environmentService.getOrThrow('MINIO_ENDPOINT'),
      port: Number(this.environmentService.get('MINIO_PORT') ?? 9000),
      useSSL: false,
      accessKey: this.environmentService.getOrThrow('MINIO_ACCESS_KEY'),
      secretKey: this.environmentService.getOrThrow('MINIO_SECRET_KEY'),
    });
    this.bucketName = this.environmentService.getOrThrow('MINIO_BUCKETNAME');
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

  listObjects({ prefix, recursive }: ListObjectOptions): Promise<BucketItem[]> {
    return new Promise<BucketItem[]>((resolve, reject) => {
      const data: BucketItem[] = [];
      const stream = this.client.listObjectsV2(
        this.bucketName,
        prefix,
        recursive,
      );
      stream.on('data', (obj) => data.push(obj));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(data));
    });
  }
  async deleteObjects(objects: string[]): Promise<void> {
    await this.client.removeObjects(this.bucketName, objects);
  }
  async deleteObject(object: string): Promise<void> {
    await this.client.removeObject(this.bucketName, object);
  }
  async createPresignedGetObject({
    object,
    expireAt,
  }: CreatePreSignedOptions): Promise<string> {
    return await this.client.presignedGetObject(
      this.bucketName,
      object,
      expireAt,
    );
  }

  async createPresignedPutObject({
    object,
    expireAt,
  }: CreatePreSignedOptions): Promise<string> {
    return await this.client.presignedPutObject(
      this.bucketName,
      object,
      expireAt,
    );
  }
}
