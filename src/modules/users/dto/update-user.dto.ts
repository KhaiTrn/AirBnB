import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  email: string;
  password: string;
  userName: string;
  role_id: 1 | 2 | 3;
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'dữ liệu gửi lên phải là YYYY-MM-DD',
  })
  @Type(() => Date)
  @IsDate({
    message: 'dữ liệu không đúng vui lòng gửi đúng định dạng YYYY-MM-DD',
  })
  birth_day: string;
}
