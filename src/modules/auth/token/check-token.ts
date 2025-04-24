import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../../common/decorators/public.decorator';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
@Injectable()
export class CheckTokenGuard extends AuthGuard('token-check') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      if (info instanceof JsonWebTokenError) {
        throw new BadRequestException('Invalid token');
      }
      if (info instanceof TokenExpiredError) {
        throw new BadRequestException('Token expired');
      }
      if (info instanceof Error) {
        throw new BadRequestException(info.message);
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
