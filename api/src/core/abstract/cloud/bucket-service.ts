import { getAbstractThrowMessage } from '../../usecase/abstract/get-abstract-throw-message';

export interface ListObjectOptions {
  prefix?: string;
  recursive?: boolean;
}

export interface CreatePreSignedOptions {
  object: string;
  expireAt?: number;
}

export interface IBucketService {
  createBucket(name: string): Promise<string>;
  isBucketExists(name: string): Promise<boolean>;
  deleteBucket(name: string): Promise<void>;
  listObjects(options: ListObjectOptions): Promise<any[]>;
  deleteObjects(objects: string[]): Promise<void>;
  deleteObject(object: string): Promise<void>;
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
  deleteObjects(objects: string[]): Promise<void> {
    throw new Error(getAbstractThrowMessage(objects));
  }
  deleteObject(object: string): Promise<void> {
    throw new Error(getAbstractThrowMessage(object));
  }
  createPresignedGetObject(options: CreatePreSignedOptions): Promise<string> {
    throw new Error(getAbstractThrowMessage(options));
  }
  createPresignedPutObject(options: CreatePreSignedOptions): Promise<string> {
    throw new Error(getAbstractThrowMessage(options));
  }
}
