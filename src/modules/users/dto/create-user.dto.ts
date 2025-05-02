import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, isDate, Matches } from 'class-validator';

export class CreateUserDto {
  email: string;
  password: string;
  userName: string;
  role_id: number;
  @ApiProperty({ example: '1996-12-01' })
  @Matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
    message: 'dữ liệu gửi lên phải là YYYY-MM-DD',
  })
  @Type(() => Date)
  @IsDate({
    message: 'dữ liệu không đúng vui lòng gửi đúng định dạng YYYY-MM-DD',
  })
  birth_day?: string;
  phone?: string;
  gender: boolean;
}
