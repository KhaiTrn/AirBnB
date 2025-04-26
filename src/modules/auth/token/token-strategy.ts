import { Injectable } from '@nestjs/common';
import { JwtSecretRequestType } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ACCESS_TOKEN_SECRET } from 'src/common/constant/app.constant';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class TokenCheckStategy extends PassportStrategy(
  Strategy,
  'token-check',
) {
  constructor(public prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET as string,
    });
  }
  async validate(payload: any) {
    console.log(`TOKEN - validate`);
    const user = await this.prisma.users.findUnique({
      where: { user_id: payload.userID },
    });
    return user;
  }
}
