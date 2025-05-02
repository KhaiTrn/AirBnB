import { IsEmail, IsString } from 'class-validator';

export class CreateRegisterDto {
  @IsString()
  @IsEmail({}, { message: 'email phải đúng định dạng' })
  email: string;
  @IsString()
  password: string;
  @IsString()
  userName: string;
}
