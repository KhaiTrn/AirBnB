import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenCheckStategy } from './modules/auth/token/token-strategy';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LocationsModule } from './modules/locations/locations.module';
import { CloudinaryService } from './modules/cloudinary/cloudinary.service';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
      serveRoot: '/upload',
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    PrismaModule,
    LocationsModule,
    CloudinaryModule,
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService, TokenCheckStategy, CloudinaryService],
})
export class AppModule {}
