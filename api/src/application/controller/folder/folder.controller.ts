import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Controller()
@ApiBearerAuth()
@ApiTags('Folder')
export class FolderController {
  constructor(private service: FolderService) {}

  @Get()
  listFolders(@Param('box_id') id: string) {
    return this.service.listFolders(id);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post()
  create(@Param('box_id') box_id: string, @Body() data: CreateFolderDto) {
    return this.service.create(box_id, data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateFolderDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
