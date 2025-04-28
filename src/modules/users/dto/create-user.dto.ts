import { Type } from 'class-transformer';
import { IsDate, isDate, Matches } from 'class-validator';

export class CreateUserDto {
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
  birth_day?: string;
  phone?: string;
  gender: boolean;
}
