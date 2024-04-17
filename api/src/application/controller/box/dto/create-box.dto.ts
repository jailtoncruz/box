import { ApiProperty } from '@nestjs/swagger';

export class CreateBoxDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  password?: string;
}
