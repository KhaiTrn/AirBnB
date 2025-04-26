import { Controller, Post, Body, Req, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from './dto/create_user.dto';
import { ResponseSuccess } from 'src/common/decorators/response-success.decorator';
@ResponseSuccess('Successful')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }
  @Public()
  @Post(`login`)
  async login(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.login(createAuthDto);
  }

  @Public()
  @Post(`refresh-token`)
  async refreshToken(@Headers() headers: any) {
    return await this.authService.refreshToken(headers);
  }
}
