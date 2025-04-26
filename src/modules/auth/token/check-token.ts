import {
  BadRequestException,
  ExecutionContext,
  ForbiddenException,
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
    console.log(`TOKEN - canActivate`);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log(`TOKEN - handleRequest`);

    console.log({ err, user, info });
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      if (info instanceof TokenExpiredError) {
        throw new ForbiddenException('Token expired');
      }
      if (info instanceof JsonWebTokenError) {
        throw new ForbiddenException('Invalid token');
      }
      if (info instanceof Error) {
        throw new UnauthorizedException(info.message);
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
