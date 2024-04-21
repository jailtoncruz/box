import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArchiveService } from './archive.service';

@Controller('archive')
@ApiTags('Archive')
export class ArchiveController {
  constructor(private service: ArchiveService) {}
}
