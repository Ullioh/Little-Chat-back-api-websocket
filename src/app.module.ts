import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './app/modules/message/message.module';
import { TravelModule } from './app/modules/travel/travel.module';
import { PrismaModule } from './app/prisma/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    TravelModule, 
    MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}