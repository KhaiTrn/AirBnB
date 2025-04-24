import { JwtSecretRequestType } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ACCESS_TOKEN_SECRET } from 'src/common/constant/app.constant';
import { PrismaService } from 'src/modules/prisma/prisma.service';

export class TokenCheckStategy extends PassportStrategy(
  Strategy,
  'token-check',
) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET as string,
    });
  }
  async validate(payload: any) {
    const user = this.prisma.users.findUnique({
      where: { user_id: payload.user_id },
    });
    return user;
  }
}
