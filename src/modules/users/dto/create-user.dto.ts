export class CreateUserDto {
  email: string;
  password: string;
  userName?: string;
  role_id: 1 | 2 | 3;
}
