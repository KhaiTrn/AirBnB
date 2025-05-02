import { Controller, Post, Body, Req, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ResponseSuccess } from 'src/common/decorators/response-success.decorator';
import { CreateRegisterDto } from './dto/register-auth.dto';
import { ApiBearerAuth, ApiHeader, ApiHeaders } from '@nestjs/swagger';
@ResponseSuccess('Successful')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createRegisterDto: CreateRegisterDto) {
    return await this.authService.register(createRegisterDto);
  }

  @Post(`login`)
  async login(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.login(createAuthDto);
  }
  @ApiHeaders([{ name: 'authorization' }, { name: 'x-access-token' }])
  @Post(`refresh-token`)
  async refreshToken(@Headers() headers: any) {
    return await this.authService.refreshToken(headers);
  }
}
