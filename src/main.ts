import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { CheckTokenGuard } from './modules/auth/token/check-token';
import { LoggingInterceptor } from './common/interceptors/response-success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new CheckTokenGuard(reflector));
  app.useGlobalInterceptors(new LoggingInterceptor(reflector));
  app.enableCors({ origin: '*' });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
