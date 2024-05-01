import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infraestructure/database/prisma/prisma.service';
import { IFolderRelation } from '../../interface/folder-relation';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class GetReferencePathUsecase {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute(
    box_id: string,
    folder_id: string,
    name?: string,
  ): Promise<string> {
    const relations = await this.getFolderRelations(folder_id);
    const remotePath = relations
      .reverse()
      .map((r) => r.name)
      .join('/')
      .concat(name ? `/${name}` : '');
    return `${box_id}/${remotePath}`;
  }

  private async getFolderRelations(
    folder_id: string,
  ): Promise<IFolderRelation[]> {
    const key = `FOLDER_RELATIONS::${folder_id}`;
    const cachedRelations = await this.cacheManager.get<IFolderRelation[]>(key);
    if (cachedRelations) return cachedRelations;
    const folder = await this.prisma.folder.findUniqueOrThrow({
      where: { id: folder_id },
      select: { id: true, name: true, parent_folder_id: true },
    });

    const folders: IFolderRelation[] = [folder];

    if (folder.parent_folder_id) {
      const parent = await this.getFolderRelations(folder.parent_folder_id);
      folders.push(...parent);
    }
    await this.cacheManager.set(key, folders, 1000 * 60 * 60 * 3);
    return folders;
  }
}
