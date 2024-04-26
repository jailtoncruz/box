import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BoxService } from './box.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateBoxDto } from './dto/create-box.dto';
import { Public } from '../../../core/decorators/public';
import { AuthenticationService } from '../../../core/abstract/authetication/authentication.service';
import { IAuthenticationBoxPayload } from '../../../infraestructure/config/authencation/box/interfaces/box-payload';

@Controller()
@ApiTags('Box')
export class BoxController {
  constructor(
    private service: BoxService,
    private authenticationService: AuthenticationService,
  ) {}

  @Public()
  @ApiQuery({ name: 'password', required: false })
  @Get(':id')
  async get(@Param('id') id: string, @Query('password') password?: string) {
    const box = await this.service.getById(id, password);
    const payload: IAuthenticationBoxPayload = { sub: id, name: box.name };
    const access_token = await this.authenticationService.getToken(payload);
    return { box, access_token };
  }

  @Public()
  @Post()
  async create(@Body() dto: CreateBoxDto) {
    const box = await this.service.create(dto);
    const payload: IAuthenticationBoxPayload = { sub: box.id, name: box.name };
    const access_token = await this.authenticationService.getToken(payload);
    return { box, access_token };
  }
}
