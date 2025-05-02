import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  email: string;
  password: string;
  userName: string;
  @Matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
    message: 'dữ liệu gửi lên phải là YYYY-MM-DD',
  })
  @Type(() => Date)
  @IsDate({
    message: 'dữ liệu không đúng vui lòng gửi đúng định dạng YYYY-MM-DD',
  })
  birth_day?: string;
  phone?: string | undefined;
}
