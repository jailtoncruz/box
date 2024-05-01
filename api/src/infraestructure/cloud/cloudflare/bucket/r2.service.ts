import { Injectable } from '@nestjs/common';
import {
  BucketService,
  CreatePreSignedOptions,
  ListObjectOptions,
} from '../../../../core/abstract/cloud/bucket-service';
import { EnvironmentService } from '../../../config/environment/environment.service';
import {
  _Object,
  GetObjectCommand,
  PutObjectCommand,
  S3,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class CloudFlareR2Service extends BucketService {
  private client: S3;
  private bucketName: string;
  constructor(private environmentService: EnvironmentService) {
    super();
    const config = this.environmentService.getCloudFlareConfig();
    this.client = new S3({
      endpoint: config.endpoint,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      region: 'auto',
    });
    this.bucketName = config.bucketName;
  }

  async listObjects({ prefix }: ListObjectOptions): Promise<_Object[]> {
    const stream = await this.client.listObjectsV2({
      Bucket: this.bucketName,
      Prefix: prefix,
    });

    return stream.Contents;
  }
  async deleteObject(object: string): Promise<void> {
    try {
      await this.client.deleteObject({
        Bucket: this.bucketName,
        Key: object,
      });
    } catch (_err) {}
  }
  async createPresignedGetObject({
    object,
    expireAt,
  }: CreatePreSignedOptions): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: object,
    });
    const url = await getSignedUrl(this.client, command, {
      expiresIn: expireAt,
    });
    return url;
  }

  async createPresignedPutObject({
    object,
    expireAt,
  }: CreatePreSignedOptions): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: object,
    });
    const url = await getSignedUrl(this.client, command, {
      expiresIn: expireAt,
    });
    return url;
  }
}
