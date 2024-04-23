import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infraestructure/database/prisma/prisma.service';
import { randomShortId } from '../../../core/usecase/id-generator';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class FolderService {
  constructor(private prisma: PrismaService) {}

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
    await this.prisma.folder.delete({
      where: { id },
    });
  }
}
