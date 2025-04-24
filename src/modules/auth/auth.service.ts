import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import {
  ACCESS_TOKEN_EXPIRESIN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRESIN,
  REFRESH_TOKEN_SECRET,
} from 'src/common/constant/app.constant';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    public jwt: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    const { email, password, userName } = createUserDto;
    const isUserNew = await this.prisma.users.findFirst({
      where: { email: email },
    });
    if (isUserNew) throw new BadRequestException('email was already taken');
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.users.create({
      data: {
        email,
        password: hashPassword,
        userName: userName,
        role_id: 3,
      },
    });
    newUser.password = '';
    return newUser;
  }
  async login(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    const isUser = await this.prisma.users.findFirst({
      where: { email: email },
    });
    if (!isUser)
      throw new BadRequestException('email or password is incorrect');
    const isPassword = await bcrypt.compare(password, isUser.password);
    if (!isPassword)
      throw new BadRequestException('email or password is incorrect');
    const token = await this.createToken(isUser.user_id);
    return {
      isUser,
      token,
    };
  }

  async refreshToken(headers: any) {
    const refreshToken = headers.authorization;
    if (!refreshToken)
      throw new UnauthorizedException('vui lòng cấp token để sử dụng');
    const accessToken = headers[`x-access-token`];
    if (!accessToken)
      throw new UnauthorizedException('Vui lòng cấp token để sử dụng');
    const decodeRefreshToken = await this.jwt.verifyAsync(refreshToken, {
      secret: REFRESH_TOKEN_SECRET,
    });
    const decodeAccessToken = await this.jwt.verifyAsync(accessToken, {
      secret: ACCESS_TOKEN_SECRET,
      ignoreExpiration: true,
    });
    if (decodeRefreshToken.userID !== decodeAccessToken.userID)
      throw new UnauthorizedException('Cặp token không hợp lệ');
    const token = this.createToken(decodeRefreshToken.userID);
    return token;
  }
  async createToken(
    userID: number,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwt.signAsync(
      { userID },
      { secret: ACCESS_TOKEN_SECRET, expiresIn: ACCESS_TOKEN_EXPIRESIN },
    );
    const refreshToken = await this.jwt.signAsync(
      { userID },
      { secret: REFRESH_TOKEN_SECRET, expiresIn: REFRESH_TOKEN_EXPIRESIN },
    );
    return { accessToken, refreshToken };
  }
}
