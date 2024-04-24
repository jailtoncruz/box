import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ArchiveService } from './archive.service';
import { CreateArchiveDto } from './dto/create-archive.dto';

@Controller()
@ApiBearerAuth()
@ApiTags('Archive')
export class ArchiveController {
  constructor(private service: ArchiveService) {}

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post()
  create(@Param('box_id') box_id: string, @Body() data: CreateArchiveDto) {
    return this.service.create(box_id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
