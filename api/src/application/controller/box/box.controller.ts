import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BoxService } from './box.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoxDto } from './dto/create-box.dto';
import { Public } from '../../../core/decorators/public';
import { AuthenticationService } from '../../../core/abstract/authetication/authentication.service';
import { IAuthenticationBoxPayload } from '../../../infraestructure/config/authencation/box/interfaces/box-payload';

@Controller('box')
@ApiTags('Box')
export class BoxController {
  constructor(
    private service: BoxService,
    private authenticationService: AuthenticationService,
  ) {}

  @Public()
  @Get(':id')
  async get(@Param('id') id: string, @Query('password') password?: string) {
    const box = await this.service.getById(id, password);
    const payload: IAuthenticationBoxPayload = { sub: id };
    const access_token = await this.authenticationService.getToken(payload);
    return { box, access_token };
  }

  @Public()
  @Post()
  async create(@Body() dto: CreateBoxDto) {
    return this.service.create(dto);
  }

  @Get(':id/pre-signed')
  getPresignedGET(@Param('id') id: string, @Query('path') path: string) {
    return this.service.getPresignedGet(id, path);
  }

  @Put(':id/pre-signed')
  getPresignedPUT(@Param('id') id: string, @Query('path') path: string) {
    return this.service.getPresignedPut(id, path);
  }
}
