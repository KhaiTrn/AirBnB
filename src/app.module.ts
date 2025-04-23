import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ServiceModule } from './modules/prisma/service/service.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, ServiceModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
