import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  create(@Param('box_id') id: string, @Body() data: CreateArchiveDto) {
    return this.service.create(id, data);
  }
}
