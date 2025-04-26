import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IS_SUCCESS_KEY } from '../decorators/response-success.decorator';
const responseSucess = (metadata = null, mes = 'ok', code = 200) => {
  if (typeof code !== `number`) code = 200;
  return { status: 'success', code: 200, message: mes, content: metadata };
};
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private refletor: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    const statusCode = res.statusCode;
    const mes = this.refletor.getAllAndOverride<string>(IS_SUCCESS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    return next
      .handle()
      .pipe(map((data) => responseSucess(data, mes, statusCode)));
  }
}
