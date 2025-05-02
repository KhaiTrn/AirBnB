import { ApiProperty } from '@nestjs/swagger';

export class UploadedFile {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
  @ApiProperty({ type: 'string' })
  id: string;
}
