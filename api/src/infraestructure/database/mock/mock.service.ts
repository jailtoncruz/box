import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../../core/abstract/database/database-service';

@Injectable()
export class MockDatabaseService<K = any> implements DatabaseService<K> {
  constructor(private logger: Logger = new Logger(MockDatabaseService.name)) {}

  async list(): Promise<K[]> {
    return [];
  }
  async getById(id: string): Promise<K> {
    return { id } as K;
  }
  async create(object: K): Promise<K> {
    return object;
  }
  async update(object: K, where: { id: string }): Promise<K> {
    this.logger.debug(`Entity ${where.id} updated.`);
    return object;
  }
  async delete(id: string): Promise<void> {
    this.logger.debug(`Entity ${id} deleted.`);
  }
}
