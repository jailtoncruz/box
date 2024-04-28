import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infraestructure/database/prisma/prisma.service';
import { randomShortId } from '../../../core/usecase/id-generator';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { ArchiveService } from '../archive/archive.service';

@Injectable()
export class FolderService {
  logger: Logger;
  constructor(
    private prisma: PrismaService,
    private archiveService: ArchiveService,
  ) {
    this.logger = new Logger(FolderService.name);
  }

  async listFolders(box_id: string) {
    const folder = await this.prisma.box.findUnique({
      where: { id: box_id },
      include: {
        folders: {
          where: { parent_folder_id: null },
        },
      },
    });
    if (!folder) throw new NotFoundException();
    return folder;
  }

  async getById(id: string) {
    const folder = await this.prisma.folder.findUnique({
      where: { id },
      include: {
        archives: true,
        child_folders: {
          select: { id: true, name: true },
        },
      },
    });
    if (!folder) throw new NotFoundException();
    return folder;
  }

  create(box_id: string, { name, parent_folder_id }: CreateFolderDto) {
    return this.prisma.folder.create({
      data: {
        id: randomShortId(),
        name,
        box_id,
        parent_folder_id,
      },
    });
  }

  update(id: string, { name }: UpdateFolderDto) {
    return this.prisma.folder.update({
      data: { name },
      where: { id },
    });
  }

  async delete(id: string) {
    const folder = await this.prisma.folder.findUnique({
      where: { id },
      include: { child_folders: true, archives: true, box: true },
    });

    for (const child of folder.child_folders) {
      await this.delete(child.id);
      this.logger.log(
        `Child folder [${child.name}] of [${folder.name}] deleted.`,
      );
    }

    for (const archive of folder.archives) {
      await this.archiveService.delete(archive.id);
      this.logger.log(`Archive [${archive.id}] of [${folder.name}] deleted.`);
    }

    await this.prisma.folder.delete({
      where: { id },
    });

    this.logger.log(`Folder [${folder.name}] deleted.`);
  }
}
