import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoxService } from './box.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoxDto } from './dto/create-box.dto';

@Controller('box')
@ApiTags('Box')
export class BoxController {
  constructor(private service: BoxService) {}

  @Get()
  async list() {
    return this.service.list();
  }

  @Post()
  async create(@Body() dto: CreateBoxDto) {
    return this.service.create(dto);
  }
}
