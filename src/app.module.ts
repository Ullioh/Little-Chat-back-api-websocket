import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './app/modules/message/message.module';
import { ChatsModule } from './app/modules/chats/chats.module';
import { PrismaModule } from './app/prisma/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ChatsModule, 
    MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}