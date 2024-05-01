import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type NodeEnvironemnt = 'production' | 'development' | 'test';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  getNodeEnvironment() {
    return this.configService.get('NODE_ENV') as NodeEnvironemnt;
  }

  getServerPort() {
    return Number(this.configService.get('SERVER_PORT') ?? 3000);
  }

  isProduction(): boolean {
    return this.getNodeEnvironment() === 'production';
  }

  get(name: string): string | undefined {
    return this.configService.get(name);
  }

  getOrThrow(name: string): string {
    return this.configService.getOrThrow(name);
  }

  getCloudFlareConfig() {
    const accountId = this.configService.getOrThrow('CLOUDFLARE_ACCOUNT_ID');
    const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;
    const accessKey = this.configService.getOrThrow('CLOUDFLARE_R2_ACCESS_KEY');
    const secretKey = this.configService.getOrThrow('CLOUDFLARE_R2_SECRET_KEY');
    const bucket = this.configService.getOrThrow('CLOUDFLARE_R2_BUCKETNAME');
    return {
      accountId,
      endpoint,
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
      bucketName: bucket,
    };
  }
}
