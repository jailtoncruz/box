export abstract class DatabaseService<
  Schema = any,
  Table = string | undefined,
> {
  async list(): Promise<Schema[]> {
    return [];
  }
  async getById(id: string): Promise<Schema> {
    return { id } as Schema;
  }
  async create(object: Schema): Promise<Schema> {
    return object;
  }
  async update(object: Schema, where: { id: string }): Promise<Schema> {
    return { ...object, ...where } as Schema;
  }
  async delete(id: string): Promise<void> {
    console.debug('Object deleted.', id, {} as Table);
  }
}
