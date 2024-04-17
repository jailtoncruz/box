import { getAbstractThrowMessage } from '../../usecase/abstract/get-abstract-throw-message';

export interface ListObjectOptions {
  bucketName: string;
  prefix?: string;
  recursive?: boolean;
}

export interface CreatePreSignedOptions {
  bucketName: string;
  object: string;
  expireAt?: number;
}

export interface IBucketService {
  createBucket(name: string): Promise<string>;
  isBucketExists(name: string): Promise<boolean>;
  deleteBucket(name: string): Promise<void>;
  listObjects(options: ListObjectOptions): Promise<any[]>;
  deleteObjects(bucketName: string, objects: string[]): Promise<void>;
  deleteObject(bucketName: string, object: string): Promise<void>;
  createPresignedGetObject(options: CreatePreSignedOptions): Promise<string>;
  createPresignedPutObject(options: CreatePreSignedOptions): Promise<string>;
}

export abstract class BucketService implements IBucketService {
  createBucket(name: string): Promise<string> {
    throw new Error(getAbstractThrowMessage(name));
  }
  isBucketExists(name: string): Promise<boolean> {
    throw new Error(getAbstractThrowMessage(name));
  }
  deleteBucket(name: string): Promise<void> {
    throw new Error(getAbstractThrowMessage(name));
  }
  listObjects(options: ListObjectOptions): Promise<any[]> {
    throw new Error(getAbstractThrowMessage(options));
  }
  deleteObjects(bucketName: string, objects: string[]): Promise<void> {
    throw new Error(getAbstractThrowMessage(bucketName, objects));
  }
  deleteObject(bucketName: string, object: string): Promise<void> {
    throw new Error(getAbstractThrowMessage(bucketName, object));
  }
  createPresignedGetObject(options: CreatePreSignedOptions): Promise<string> {
    throw new Error(getAbstractThrowMessage(options));
  }
  createPresignedPutObject(options: CreatePreSignedOptions): Promise<string> {
    throw new Error(getAbstractThrowMessage(options));
  }
}
