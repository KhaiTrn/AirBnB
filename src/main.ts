import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { CheckTokenGuard } from './modules/auth/token/check-token';
import { LoggingInterceptor } from './common/interceptors/response-success.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalGuards(new CheckTokenGuard(reflector));
  app.useGlobalInterceptors(new LoggingInterceptor(reflector));
  app.enableCors({ origin: '*' });
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('AirBnB')
    .setDescription('AirBnB API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
